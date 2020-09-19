const express = require('express');
const router = express.Router();
const buscaController = require('../controllers/buscaController');

router
    .route('/pontos')
    .get(buscaController.buscaPontos);

module.exports = router;
