const Minio = require('minio');
require('dotenv').config();

const endpointUrl = new URL(process.env.MINIO_ENDPOINT);
const useSSL = endpointUrl.protocol === 'https:';
const port = endpointUrl.port ? parseInt(endpointUrl.port) : (useSSL ? 443 : 80);

const minioClient = new Minio.Client({
  endPoint: endpointUrl.hostname, // gunakan hostname yang benar
  port: port,
  useSSL: useSSL,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

module.exports = { minioClient };