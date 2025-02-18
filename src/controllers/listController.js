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
    const { filename } = req.params;
    const { newFilename } = req.body;

    if (!newFilename || !newFilename.trim()) {
        return res.status(400).json({ message: 'New filename cannot be empty.' });
    }

    try {
        // Pastikan file lama ada
        await minioClient.statObject(bucketName, filename);
    } catch (err) {
        return res.status(404).json({ message: 'File not found', error: err });
    }

    // Copy file lama ke nama baru
    const copySource = `/${bucketName}/${filename}`;
    minioClient.copyObject(bucketName, newFilename, copySource, (copyErr) => {
        if (copyErr) {
            return res.status(500).json({ message: 'Failed to copy object', error: copyErr });
        }
        // Hapus file lama
        minioClient.removeObject(bucketName, filename, (removeErr) => {
            if (removeErr) {
                return res.status(500).json({ message: 'Failed to remove old object', error: removeErr });
            }
            res.json({ message: `File renamed from ${filename} to ${newFilename}` });
        });
    });
};

module.exports = {
    listMidiFiles,
    deleteMidiFile,
    renameMidiFile,
};
