const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadMidiFile } = require('../controllers/uploadController');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Gunakan nama asli file
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadMidiFile);

module.exports = router;
