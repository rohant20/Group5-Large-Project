const { connectToDatabase, returnWithError, returnWithMessage } = require("./utils");

async function verifyToken(token) {
    const database = await connectToDatabase();
    const users = database.collection("Users");

    const user = await users.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
    
    console.log("User found:", user);
    
    if (!user) return returnWithError("Invalid or expired token");

    return returnWithMessage("Token is valid");
}

// Correct export
module.exports = { verifyToken };
