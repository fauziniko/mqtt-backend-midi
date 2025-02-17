const express = require('express');
const router = express.Router();
const { getMidiFile } = require('../controllers/downloadController');
const client = require('../config/mqtt');

router.get('/download/:filename', getMidiFile);

module.exports = router;
