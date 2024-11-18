const express = require("express");
const deleteUserRouter = express.Router();

const { deleteUser } = require("../controllers/deleteUserController");

deleteUserRouter.post("/deleteUser", deleteUser);

module.exports = {
    deleteUserRouter
}