const fs = require('fs');
const path = require('path');
const { parseDXF, toGeoJSON } = require('../utils/dxfParser');

exports.processDXF = (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded!');

    const filePath = req.file.path;
    try {
        const dxfData = parseDXF(filePath);
        const geoJSON = toGeoJSON(dxfData);
        res.status(200).json({ success: true, geoJSON });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } finally {
        fs.unlinkSync(filePath);
    }
};
