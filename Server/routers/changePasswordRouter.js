const express = require("express");
const changePasswordRouter = express.Router();

const { changePassword } = require("../controllers/changePasswordController");


changePasswordRouter.post("/changePassword", changePassword);

module.exports = {
    changePasswordRouter
}