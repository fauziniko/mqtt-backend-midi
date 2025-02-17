const multer = require('multer');

const storage = multer.memoryStorage(); // Simpan file dalam buffer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'audio/midi') {
            cb(null, true);
        } else {
            cb(new Error('Only MIDI files are allowed'), false);
        }
    }
});

module.exports = upload;
