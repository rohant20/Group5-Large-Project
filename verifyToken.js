// verifyToken.js
const { connectToDatabase, returnWithError, returnWithMessage } = require("./utils");

async function verifyToken(token) {
    const database = await connectToDatabase();
    const users = database.collection("Users");

    const user = await users.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });
    if (!user) return returnWithError("Invalid or expired token");

    return returnWithMessage("Token is valid");
}

module.exports = verifyToken;
