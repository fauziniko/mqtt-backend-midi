const express = require('express');
const router = express.Router();
const { getMidiFile } = require('../controllers/downloadController');

/**
 * @swagger
 * /api/download/{filename}:
 *   get:
 *     summary: Download MIDI file
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the MIDI file to download
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 */
router.get('/download/:filename', getMidiFile);

module.exports = router;
