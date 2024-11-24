const express = require('express');
const router = express.Router();

const {ContactUsController} = require('../controllers/ContactUsController');

router.post('/contact', ContactUsController);

module.exports = router