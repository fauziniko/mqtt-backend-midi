const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadMidiFile } = require('../controllers/uploadController');

const upload = multer();

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload MIDI file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Failed to upload file to MinIO
 */
router.post('/files/upload', upload.single('file'), uploadMidiFile);

module.exports = router;
