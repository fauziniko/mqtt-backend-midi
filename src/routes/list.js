const express = require('express');
const router = express.Router();
const { listMidiFiles } = require('../controllers/listController');

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

module.exports = router;
