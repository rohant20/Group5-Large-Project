const express = require("express");
const loginRouter = express.Router();

const { getUserByEmailAndPassword } = require("../controllers/searchUserByEmail");


loginRouter.post("/login", getUserByEmailAndPassword);

module.exports = {
    loginRouter
}