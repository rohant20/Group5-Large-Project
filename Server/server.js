const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { User } = require("./models/userModel");
const { entryRouter } = require("./routers/entryRouter");
const { userRouter } = require("./routers/fetchUserRouter");
const { deleteUserRouter } = require("./routers/deleteUserRouter");
const { changePasswordRouter } = require("./routers/changePasswordRouter");
const { listingRouter } = require("./routers/fetchListingRouter");



const port = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URL;
const dbURL = 'mongodb+srv://root:GroupFive5@cop4331db.jh3zx.mongodb.net/?retryWrites=true&w=majority&appName=COP4331DB';


dotenv.config();




mongoose.connect(dbURL, { dbName: 'steezeeDB', }).then(() => {
    console.log("Database is connected sucessfully!");

    app.use(cors());            //CORS-enables all routes
    app.use(express.json());    //JSON formatting middleware provided by Express

    //Routes

    // Default route, let's us know the server is running
    app.post("/", async (req, res) => {
        res.status(200).json({ message: "Hello World" });
    });

    app.use(changePasswordRouter);  // Changes User Password (assumes authentication is done elsewhere)
    // /changePassword {"_id": "1234", "newPassword": "newpass"} -> { _id, username, email, password}  

    app.use(deleteUserRouter);      // Deletes User by ID
    // /deleteUser {"_id": "1234"} -> { "message" : "Account deleted"}

    app.use(entryRouter);           // /login {"email" : "test@gmail.com", "password" : "pass"} -> {_id, username, email, password}
    // /signup {"email" : "test@gmail.com", "password" : "pass", "username" : "user"} -> {_id}

    app.use(userRouter);            // Fetches User by ID or Username 
    // /fetchUserByID {"_id": "1234"} -> {_id, username, email, password} 
    // /fetchUserByUsername {"username": "user"} -> {_id, username, email, password}

    app.use(listingRouter);         // Fetches listings by ID or Username
    // /fetchListingByID {"_id": "1234"} -> { _id, name, size, title, price, brand, count, condition, description, tags}
    // /fetchListingsByUser {"username": "user"} -> [{ _id, name, size, title, price, brand, count, condition, description, tags}]
    app.listen(5000, () => { console.log(`Server up and running on ${port}`); }); //Opens port/starts server
}).catch(err => {
    console.log(err);
});






