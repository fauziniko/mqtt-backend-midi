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
    client.subscribe('midi/upload', { qos: 1 }, (err) => {
        if (err) console.error('Subscription failed:', err);
        else console.log('Subscribed to topic: midi/upload');
    });
});

client.on('message', (topic, message) => {
    if (topic === 'midi/upload') {
        try {
            const { fileName, data } = JSON.parse(message.toString());
            const midiBuffer = Buffer.from(data, 'base64');

            const storageDir = path.join(__dirname, '../storage');
            if (!fs.existsSync(storageDir)) {
                fs.mkdirSync(storageDir, { recursive: true });
            }

            const filePath = path.join(storageDir, fileName);
            fs.writeFileSync(filePath, midiBuffer);
            console.log(`MIDI file received and saved: ${fileName}`);
        } catch (error) {
            console.error('Error processing MIDI file:', error);
        }
    }
});

client.on('error', (err) => {
    console.error('MQTT Error:', err);
});

module.exports = client;
