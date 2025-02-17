const express = require('express');
const router = express.Router();
const { getMidiFile } = require('../controllers/downloadController');

router.get('/download/:filename', getMidiFile);

module.exports = router;
