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


mongoose.connect(mongourl, {
    dbName: 'steezeeDB',
}).then(() => {
    console.log("Database is connected sucessfully!");



    //Opens port/starts server
    app.listen(port, () => {
        console.log(`Server up and running on ${port}`);
    });

    //CORS-enables all routes
    app.use(cors({
        credentials: true,
        //Change this if your port is different when dev testing
        origin: "http://localhost:5173"
    }));

    //JSON formatting middleware provided by Express
    app.use(express.json());

    //Routes defined in "/routes"
    app.use(loginRouter);

}).catch(err => {
    console.log(err);
});






