const mqtt = require('../config/mqtt');
const fs = require('fs');
const path = require('path');

const uploadMidiFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString('base64');

    // Kirim data dan nama file ke MQTT
    const message = JSON.stringify({ fileName, data: base64Data });
    mqtt.publish('midi/upload', message, { qos: 1 }, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to publish to MQTT' });
        }
        res.status(200).json({ message: 'MIDI file uploaded and sent to MQTT', fileName });
    });
};

module.exports = { uploadMidiFile };
