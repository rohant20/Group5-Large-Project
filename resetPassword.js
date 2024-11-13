// resetPassword.js
const { connectToDatabase, hashPassword, returnWithError, returnWithMessage } = require("./utils");

async function resetPassword(token, newPassword) {
    const database = await connectToDatabase();
    const users = database.collection("Users");

    const user = await users.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });
    if (!user) return returnWithError("Invalid or expired token");

    const hashedPassword = await hashPassword(newPassword);
    await users.updateOne(
        { resetToken: token },
        { $set: { password: hashedPassword }, $unset: { resetToken: "", tokenExpiry: "" } }
    );

    return returnWithMessage("Password has been reset successfully");
}

module.exports = resetPassword;
