const express = require('express');
const app = express();
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

const getUserByID = asyncHandler(async (req, res) => {
    try {

        const userID = req.body._id;

        const currUser = await User.findOne({
            _id: userID
        })

        if (currUser == null) {
            res.status(404).json({ message: "Account not found" })
        }

        res.status(200).json(currUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getUserByUsername = asyncHandler(async (req, res) => {
    try{
            
            const username = req.body.username;
    
            const currUser = await User.findOne({
                username: username
            })

            if(currUser == null){
                res.status(404).json({ message: "Account not found" })
            }

            res.status(200).json(currUser);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    getUserByID, getUserByUsername
}