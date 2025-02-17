const fs = require('fs');
const path = require('path');

const listMidiFiles = (req, res) => {
    const storageDir = path.join(__dirname, '../storage');

    if (!fs.existsSync(storageDir)) {
        return res.status(404).json({ message: 'No MIDI files found' });
    }

    fs.readdir(storageDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading files' });
        }

        const midiFiles = files.filter(file => file.endsWith('.mid'));
        res.json({ files: midiFiles });
    });
};

module.exports = { listMidiFiles };
