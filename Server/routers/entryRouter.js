const express = require("express");
const entryRouter = express.Router();

const { loginUser, signUpUser } = require("../controllers/entryController");


entryRouter.post("/login", loginUser);
entryRouter.post("/signup", signUpUser);

module.exports = {
    entryRouter
}