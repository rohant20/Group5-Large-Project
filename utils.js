const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:8000";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    await client.connect();
    return client.db("COP4331");
}

function generateToken() {
    return crypto.randomBytes(32).toString("hex");
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

function returnWithError(error) {
    return JSON.stringify({ success: false, error });
}

function returnWithMessage(message) {
    return JSON.stringify({ success: true, message });
}

module.exports = { connectToDatabase, generateToken, hashPassword, returnWithError, returnWithMessage };
