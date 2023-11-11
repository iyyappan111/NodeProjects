const express = require('express');
const router = express.Router();
const services = require('../services');
router.post('/insert',services.insertData);
router.put('/update',services.updateDataById);
router.delete('/delete',services.deleteDataById);
router.get('/get',services.getAllData);
module.exports = router;
