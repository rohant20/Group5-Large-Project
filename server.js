const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { User } = require("./models/userModel");
const { loginRouter } = require("./routers/loginRouter");
const { userRouter } = require("./routers/fetchUserRouter");


const port = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URL;
const dbURL = 'mongodb+srv://root:GroupFive5@cop4331db.jh3zx.mongodb.net/?retryWrites=true&w=majority&appName=COP4331DB';


dotenv.config();




mongoose.connect(dbURL, {dbName: 'steezeeDB',}).then(() => {
    console.log("Database is connected sucessfully!");

    app.use(cors());            //CORS-enables all routes
    app.use(express.json());    //JSON formatting middleware provided by Express
    
    //Routes

    // Default route, let's us know the server is running
    app.post("/", async (req, res) => {
        res.status(200).json({ message: "Hello World" });
    });

    app.use(loginRouter); // Fetched User by Email and Password
    app.use(userRouter);  // Fetches User by ID
    
    app.listen(5000, () => {console.log(`Server up and running on ${port}`);}); //Opens port/starts server
}).catch(err => {
    console.log(err);
});






