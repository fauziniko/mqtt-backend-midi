const express = require('express');
const router = express.Router();
const { listMidiFiles, deleteMidiFile } = require('../controllers/listController');

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Get list of MIDI files
 *     responses:
 *       200:
 *         description: List of MIDI files
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error reading MIDI files from MinIO
 */
router.get('/files', listMidiFiles);

/**
 * @swagger
 * /api/files/{filename}:
 *   delete:
 *     summary: Delete MIDI file
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the MIDI file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 */
router.delete('/files/:filename', deleteMidiFile);

module.exports = router;
