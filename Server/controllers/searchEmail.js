const express = require('express');
const app = express();
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

const getUser = asyncHandler(async (req, res) => {
  try {
    console.log(User.find({}));
    const userInput = {
      email: req.body.email,
      password: req.body.password
    }

    console.log(userInput.email + " " + userInput.password);

    const currUser = await User.findOne({
      email: userInput.email,
      password: userInput.password
    });

    if (currUser == null) {
      res.status(500).json({ message: "Account not found" })
    } else {
      console.log(currUser);

      res.status(200).json(currUser);
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

module.exports = {
  getUser
}