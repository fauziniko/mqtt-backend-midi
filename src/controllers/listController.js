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

const deleteMidiFile = (req, res) => {
    const { filename } = req.params;

    minioClient.removeObject(bucketName, filename, (err) => {
        if (err) {
            // Misalnya file tidak ada di bucket
            return res.status(404).json({ message: 'File not found', error: err });
        }
        // Jika berhasil
        res.json({ message: `File ${filename} deleted successfully` });
    });
};

module.exports = { listMidiFiles, deleteMidiFile };
