const express = require('express');
const app = express();
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userID = req.body._id;

        const deletedUser = await User.findByIdAndDelete(userID);

        if (deletedUser == null) {
            res.status(400).json({ message: "Account not found" })
        }

        res.status(200).json({ message: "Account deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = { deleteUser }