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
            return res.status(404).json({ message: 'File not found', error: err });
        }
        res.json({ message: `File ${filename} deleted successfully` });
    });
};

const renameMidiFile = async (req, res) => {
    // ... existing rename logic
};

const searchMidiFiles = (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm || !searchTerm.trim()) {
        return res.status(400).json({ message: 'Query parameter "q" is required for searching.' });
    }

    const objectsStream = minioClient.listObjectsV2(bucketName, '', true);
    let files = [];

    objectsStream.on('data', (obj) => {
        files.push(obj.name);
    });
    objectsStream.on('error', (err) => {
        return res.status(500).json({ message: 'Error reading MIDI files from MinIO', error: err });
    });
    objectsStream.on('end', () => {
        // Filter file yang mengandung searchTerm
        const filtered = files.filter((file) => file.toLowerCase().includes(searchTerm.toLowerCase()));
        res.json({ files: filtered });
    });
};

module.exports = {
    listMidiFiles,
    deleteMidiFile,
    renameMidiFile,
    searchMidiFiles,
};
