const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const { loginRouter } = require("./routers/loginRouter");
const { resetRouter } = require("./routers/resetPasswordRouter"); // Import the reset password router

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongourl = process.env.MONGO_URL;

// Middleware to parse JSON
app.use(express.json());

// Mount routers
app.use(loginRouter);
app.use(resetRouter);
console.log("Reset router is mounted");

// Connect to MongoDB and start the server
mongoose
  .connect(mongourl, { dbName: "steezeeDB" })
  .then(() => {
    console.log("Database is connected successfully!");

    app.listen(port, () => {
      console.log(`Server up and running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
