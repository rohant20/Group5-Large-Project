const express = require("express");
const userRouter = express.Router();

const { getUserByID } = require("../controllers/fetchUserController");


userRouter.post("/fetchUser", getUserByID);

module.exports = {
    userRouter
}