
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const universalFunc = require('../utils/universalFunc');

router.post('/signup', universalFunc.checkSignUpPayload ,authController.signup);
router.post('/login', authController.login);

module.exports = router;