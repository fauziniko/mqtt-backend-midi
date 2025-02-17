const express = require('express');
const router = express.Router();
const { listMidiFiles } = require('../controllers/listController');

router.get('/files', listMidiFiles);

module.exports = router;
