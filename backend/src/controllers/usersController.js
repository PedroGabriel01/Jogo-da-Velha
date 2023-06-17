const usersModel = require("../models/usersModel");
const User = require("./entitys/user");

const save = (req, res) => {
    usersModel.save(req.body);
    res.status(200).send("success!");
}

const getAll = async (req, res) => {
    return  res.status(200).send(await usersModel.getAll()); 
}

module.exports = {
    save,
    getAll
}