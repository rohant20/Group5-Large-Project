const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User } = require("./models/userModel");

const { loginRouter } = require("./routers/loginRouter");

dotenv.config();

const port = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URL;


mongoose.connect(mongourl, {
    dbName: 'steezeeDB',
}).then(() => {
    console.log("Database is connected sucessfully!");

    app.listen(port, () => {
        console.log(`Server up and running on ${port}`);
    });

    app.use(express.json());
    app.use(loginRouter);
}).catch(err => {
    console.log(err);
});






