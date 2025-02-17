const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const options = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
};

const client = mqtt.connect(process.env.MQTT_BROKER, options);

client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    // Mengganti topik subscribe ke pattern "lagu/+"
    client.subscribe('lagu/+', { qos: 1 }, (err) => {
        if (err) console.error('Subscription failed:', err);
        else console.log('Subscribed to topic pattern: lagu/+');
    });
});

client.on('message', (topic, message) => {
    // Proses pesan yang masuk pada topic dengan format "lagu/{nomor}"
    if (topic.startsWith('lagu/')) {
        try {
            const { title, data } = JSON.parse(message.toString());
            const midiBuffer = Buffer.from(data, 'base64');

            const storageDir = path.join(__dirname, '../storage');
            if (!fs.existsSync(storageDir)) {
                fs.mkdirSync(storageDir, { recursive: true });
            }

            // Simpan file menggunakan judul lagu sebagai nama file
            const filePath = path.join(storageDir, title);
            fs.writeFileSync(filePath, midiBuffer);
            console.log(`MIDI file received and saved: ${title}`);
        } catch (error) {
            console.error('Error processing MIDI file:', error);
        }
    }
});

client.on('error', (err) => {
    console.error('MQTT Error:', err);
});

module.exports = client;
