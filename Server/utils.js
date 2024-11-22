const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config();  // Ensure environment variables are loaded from .env

// Use the MongoDB URI from the environment variables
const uri = process.env.MONGO_URL;  // Use the correct MongoDB URI from .env
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to connect to the database
async function connectToDatabase() {
    await client.connect();  // Connect directly, no need for isConnected() anymore
    return client.db("steezeeDB");  // You can change the database name here if necessary
}

// Function to generate a random token (e.g., for password reset)
function generateToken() {
    return crypto.randomBytes(32).toString("hex");
}

// Function to hash a password
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

// Function to return an error response
function returnWithError(error) {
    return { success: false, error };  // Return an object with success and error
}

// Function to return a success message
function returnWithMessage(message) {
    return { success: true, message };  // Return an object with success and message
}

module.exports = { connectToDatabase, generateToken, hashPassword, returnWithError, returnWithMessage };
