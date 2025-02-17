const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadMidiFile } = require('../controllers/uploadController');

// Gunakan memoryStorage agar file tidak disimpan ke disk
const storage = multer.memoryStorage();
const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        // Validasi MIME type MIDI (sesuaikan jika perlu)
        if (file.mimetype === 'audio/midi' || file.mimetype === 'audio/x-midi') {
            cb(null, true);
        } else {
            cb(new Error('Only MIDI files are allowed'), false);
        }
    }
});

router.post('/upload', upload.single('file'), uploadMidiFile);

module.exports = router;
