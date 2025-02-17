const path = require('path');
const fs = require('fs');

const getMidiFile = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../storage', filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
    }

    res.download(filePath, filename, (err) => {
        if (err) {
            res.status(500).json({ message: 'Failed to download MIDI file' });
        }
    });
};

module.exports = { getMidiFile };
