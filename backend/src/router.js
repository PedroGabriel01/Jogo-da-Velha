const express = require("express");
const jogadoresController = require("./controllers/jogadoresController");

const router = express.Router();

router.get('/jogadores/:nome', jogadoresController.obter);

router.get('/jogadores', jogadoresController.obterTodos);

router.get('/top10', jogadoresController.obterTop10);

router.post('/jogadores', jogadoresController.salvar);

router.put('/jogadores/:nome/marcarVitoria', jogadoresController.marcarVitoria);

module.exports = router;