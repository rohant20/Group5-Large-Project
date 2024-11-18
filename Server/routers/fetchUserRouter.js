const express = require("express");
const userRouter = express.Router();

const { getUserByID, getUserByUsername } = require("../controllers/fetchUserController");


userRouter.post("/fetchUserByID", getUserByID);
userRouter.post("/fetchUserByUsername", getUserByUsername);

module.exports = {
    userRouter
}