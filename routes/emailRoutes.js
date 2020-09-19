const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router
    .route('/contato')
    .get(emailController.enviaEmail);

module.exports = router;
