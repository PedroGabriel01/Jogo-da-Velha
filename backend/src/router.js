const express = require("express");
const usersController = require("./controllers/usersController");
const usersMiddleware = require("./middlewares/usersMiddleware");

const router = express.Router();

router.get('/', usersController.getAll);

router.post('/',  usersMiddleware.validateBody, usersController.save);

module.exports = router;