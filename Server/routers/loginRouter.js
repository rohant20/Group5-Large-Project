const express = require("express");
const loginRouter = express.Router();

const { getUser } = require("../controllers/searchEmail");

loginRouter.post("/login", getUser);

module.exports = {
    loginRouter
}