const Minio = require('minio');

const endpoint = process.env.MINIO_ENDPOINT || 'minio';
const useSSL = endpoint.startsWith('https');
const port = process.env.MINIO_PORT ? Number(process.env.MINIO_PORT) : (useSSL ? 443 : 80);
const region = process.env.MINIO_REGION || 'jakarta';

const minioClient = new Minio.Client({
    endPoint: endpoint.replace(/^https?:\/\//, ''),
    port,
    useSSL,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

// Export region agar bisa digunakan saat membuat bucket
module.exports = { minioClient, region };