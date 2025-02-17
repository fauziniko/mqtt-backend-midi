const mqtt = require('../config/mqtt');
const fs = require('fs');
const path = require('path');

const uploadMidiFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Tentukan topic berikutnya berdasarkan file di folder storage
    const storageDir = path.join(__dirname, '../storage');
    let nextNumber = 1;
    if (fs.existsSync(storageDir)) {
        const files = fs.readdirSync(storageDir).filter(file => file.endsWith('.mid'));
        nextNumber = files.length + 1;
    }

    // Format topic: lagu/1, lagu/2, dan seterusnya.
    const topic = `lagu/${nextNumber}`;

    const fileName = req.file.originalname; // nama asli file tetap digunakan
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString('base64');

    // Buat payload dengan judul lagu (nama asli) dan data MIDI
    const message = JSON.stringify({ title: fileName, data: base64Data });
    mqtt.publish(topic, message, { qos: 1 }, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to publish to MQTT' });
        }
        res.status(200).json({ message: `MIDI file uploaded and sent to MQTT with topic ${topic}`, title: fileName });
    });
};

module.exports = { uploadMidiFile };
