const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./models/userModel");
const { loginRouter } = require("./routers/loginRouter");

dotenv.config();

const port = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URL;


mongoose.connect("mongodb+srv://root:GroupFive5@cop4331db.jh3zx.mongodb.net/?retryWrites=true&w=majority&appName=COP4331DB", {
    dbName: 'steezeeDB',
}).then(() => {
    console.log("Database is connected sucessfully!");



    //Opens port/starts server
    app.listen(5000, () => {
        console.log(`Server up and running on 5000`);
    });

    //CORS-enables all routes
    app.use(cors({
        credentials: true,
        //Change this if your port is different when dev testing
        origin: "http://www.steezee.xyz"
    }));

    //JSON formatting middleware provided by Express
    app.use(express.json());

    //Routes defined in "/routes"
    app.use(loginRouter);

}).catch(err => {
    console.log(err);
});






