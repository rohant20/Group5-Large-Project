const express = require('express');
const app = express();
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Typically a value between 10 and 12

let salt;

bcrypt.genSalt(saltRounds, (err, s) => {
    if (err) {
        // Handle error
        return;
    }
    // Salt generation successful, proceed to hash the password
    salt = s;
});

const loginUser = asyncHandler(async (req, res) => {
    try {

        const userInput = {
            email: req.body.email,
            password: req.body.password
        }

        console.log(userInput.email + " " + userInput.password);

        const currUser = await User.findOne({
            email: userInput.email,
        });

        console.log(currUser);

        if (currUser == null) {
            res.status(500).json({ message: "Account not found" })
        } else {
            bcrypt.compare(userInput.password, currUser.password, (err, result) => {
                if (err) {
                    // Handle error
                    console.error('Error comparing passwords:', err);
                    return;
                }

                if (result) {
                    console.log(currUser);
                    res.status(200).json(currUser);
                } else {
                    // Passwords don't match, authentication failed
                    res.status(500).json({ message: "Account not found" })
                }
            });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

//Sign Up logic

const signUpUser = asyncHandler(async (req, res) => {
    try {

        const userInput = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }


        const exsistingUsers = await User.find({
            $or:
                [
                    {
                        email: userInput.email
                    }, {
                        username: userInput.username
                    }
                ]
        }
        );

        console.log(exsistingUsers.length);

        if (exsistingUsers.length == 0) {
            //Hashing password
            let hashedPassword = await bcrypt.hash(userInput.password, salt);



            console.log(hashedPassword);

            console.log(userInput.email + " " + userInput.password);


            const insertedUser = await User.collection.insertOne({
                username: userInput.username,
                email: userInput.email,
                password: hashedPassword
            });

            res.status(200).json({ "_id": insertedUser.insertedId });
        } else {
            res.status(500).json({ message: "userExsist" });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

});

//forget Password Logic

module.exports = {
    loginUser,
    signUpUser
}