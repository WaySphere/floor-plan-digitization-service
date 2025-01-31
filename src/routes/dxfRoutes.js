const express = require('express');
const multer = require('multer');
const { processDXF } = require('../controllers/dxfController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), processDXF);

module.exports = router;
