const { minioClient } = require('../config/minio');
const bucketName = process.env.MINIO_BUCKET || 'midi-files';

const getMidiFile = (req, res) => {
    const { filename } = req.params;
    minioClient.getObject(bucketName, filename, (err, dataStream) => {
        if (err) {
            return res.status(404).json({ message: 'File not found', error: err });
        }
        // Mengatur agar file diunduh dengan nama aslinya
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        dataStream.pipe(res);
    });
};

module.exports = { getMidiFile };
