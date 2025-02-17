const mqtt = require('../config/mqtt');
const { minioClient, region } = require('../config/minio');
const path = require('path');

const uploadMidiFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = req.file.originalname;
    const fileBuffer = req.file.buffer;
    const bucketName = process.env.MINIO_BUCKET || 'midi-files';

    try {
        // Cek keberadaan bucket menggunakan listBuckets
        const buckets = await new Promise((resolve, reject) => {
            minioClient.listBuckets((err, buckets) => {
                if (err) return reject(err);
                resolve(buckets);
            });
        });
        const exists = buckets.some(b => b.name === bucketName);

        if (!exists) {
            // Jika bucket tidak ada, buat bucket-nya
            await new Promise((resolve, reject) => {
                minioClient.makeBucket(bucketName, region, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }
        uploadToMinio();
    } catch (err) {
        return res.status(500).json({ message: 'Error checking bucket existence', error: err });
    }

    function uploadToMinio() {
        minioClient.putObject(bucketName, fileName, fileBuffer, (err, etag) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to upload file to MinIO', error: err });
            }
            // Buat link bucket dengan menggabungkan MINIO_ENDPOINT, bucketName, dan fileName
            const bucketLink = `${process.env.MINIO_ENDPOINT}/${bucketName}/${fileName}`;
            // Gunakan topik dengan satu angka acak setelah "lagu/"
            const topic = `lagu/${Math.floor(Math.random() * 10)}`;
            const message = JSON.stringify({ title: fileName, minioBucket: bucketName, etag, bucketLink });
            mqtt.publish(topic, message, { qos: 1 }, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to publish to MQTT', error: err });
                }
                res.status(200).json({ message: `MIDI file uploaded to MinIO and sent to MQTT at topic ${topic}`, title: fileName, bucketLink });
            });
        });
    }
};

module.exports = { uploadMidiFile };
