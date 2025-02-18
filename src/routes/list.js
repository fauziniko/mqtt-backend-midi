const express = require('express');
const router = express.Router();
const {
  listMidiFiles,
  deleteMidiFile,
  renameMidiFile, // harus sama dengan yang di-export
  searchMidiFiles, // Import fungsi search
} = require('../controllers/listController');

console.log('renameMidiFile is:', renameMidiFile); // Lihat di terminal

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
 * /api/files/search:
 *   get:
 *     summary: Search MIDI files by name
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Query string to match file names
 *     responses:
 *       200:
 *         description: List of files that match the query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Query parameter "q" is required
 *       500:
 *         description: Error reading MIDI files from MinIO
 */
router.get('/files/search', searchMidiFiles);

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

/**
 * @swagger
 * /api/files/{filename}:
 *   put:
 *     summary: Rename a MIDI file
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Current name of the MIDI file
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newFilename:
 *                 type: string
 *                 description: New name of the MIDI file
 *     responses:
 *       200:
 *         description: File renamed from old name to new name
 *       400:
 *         description: New filename cannot be empty
 *       404:
 *         description: File not found
 *       500:
 *         description: Failed to copy or remove object in MinIO
 */
router.put('/files/:filename', renameMidiFile);

module.exports = router;
