const { minioClient } = require('../config/minio');
const bucketName = process.env.MINIO_BUCKET || 'midi-files';

const listMidiFiles = (req, res) => {
    const objectsStream = minioClient.listObjectsV2(bucketName, '', true);
    const files = [];

    objectsStream.on('data', (obj) => {
        files.push(obj.name);
    });
    objectsStream.on('error', (err) => {
        return res.status(500).json({ message: 'Error reading MIDI files from MinIO', error: err });
    });
    objectsStream.on('end', () => {
        res.json({ files });
    });
};

module.exports = { listMidiFiles };
