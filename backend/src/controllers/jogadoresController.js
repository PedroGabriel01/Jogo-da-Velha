const jogadoresModel = require("../models/jogadoresModel");

const salvar = async (req, res) => {
    console.log("Teste2");
    await jogadoresModel.salvar(req.body);
    return res.status(200).send();
}

const obter = async (req, res) => {
    return res.status(200).send(await jogadoresModel.obter(req.params.nome));
}

const obterTodos = async (req, res) => {
    return res.status(200).send(await jogadoresModel.obterTodos());
}

const marcarVitoria = async (req, res) => {
    return res.status(200).send(await jogadoresModel.marcarVitoria(req.params.nome));
}

const obterTop10 = async (req, res) => {
    return res.status(200).send(await jogadoresModel.obterTop10());
}

module.exports = {salvar, obter, obterTodos, marcarVitoria, obterTop10};