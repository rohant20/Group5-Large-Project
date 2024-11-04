const express = require('express');
const app = express();
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

const getUser = asyncHandler(async (req, res) => {
  try {
    console.log(User.find({}));
    const userInput = {
      username: req.body.username,
      password: req.body.password
    }

    console.log(userInput.username + " " + userInput.password);

    const currUser = await User.findOne({
      username: userInput.username,
      password: userInput.password
    });


    console.log(currUser);

    res.status(200).json(currUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

module.exports = {
  getUser
}