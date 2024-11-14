const express = require("express");
const userRouter = express.Router();

const { getUserByID } = require("../controllers/searchUserByID");


userRouter.post("/fetchUser", getUserByID);

module.exports = {
    userRouter
}