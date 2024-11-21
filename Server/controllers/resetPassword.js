const { connectToDatabase, hashPassword, returnWithError, returnWithMessage } = require("../utils");

async function resetPassword(token, newPassword) {
    // Connect to the database
    const database = await connectToDatabase();  // This gives you the connected database
    const users = database.collection("users");

    console.log("Reset token to query:", token);  // Log the token you are querying with

    // Find the user by resetToken and check if the resetTokenExpiration is still valid
    const user = await db.collection('users').findOne({
        resetToken: token, 
        resetTokenExpiration: { $gt: Date.now() }
    });
    

    // Log the user found and expiration check
    console.log("User found:", user);
    console.log("Current time:", Date.now());
    if (user) {
        console.log("Token expiration:", user.resetTokenExpiration);
    } else {
        console.log("No user found or token has expired");
    }

    if (!user) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password and remove the resetToken and its expiration
    await users.updateOne(
        { resetToken: token },
        { $set: { password: hashedPassword }, $unset: { resetToken: "", resetTokenExpiration: "" } }
    );

    return returnWithMessage("Password has been reset successfully");
}

module.exports = { resetPassword };
