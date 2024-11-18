const express = require('express');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");

const saltRounds = 10; // Define saltRounds

let salt;
bcrypt.genSalt(saltRounds, (err, s) => {
    if (err) {
        // Handle error
        return;
    }
    // Salt generation successful, proceed to hash the password
    salt = s;
});


// Assumes that user is already authenticated, provide the user's _id and new password
const changePassword = asyncHandler(async (req, res) => {
    try {

        const userID = req.body._id;
        const newPassword = req.body.newPassword;

        const currUser = await User.findOne({
            _id: userID
        })

        if (currUser == null) {
            res.status(404).json({ message: "Account not found" })
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        currUser.password = hashedPassword;
        await currUser.save();
        
        res.status(200).json(currUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    changePassword
}

