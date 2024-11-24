const bcrypt = require('bcryptjs');  // Import bcryptjs
const { User } = require('../models/userModel');

// Hash the password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);  // Generate a salt
    return bcrypt.hash(password, salt);  // Hash the password with the salt
}

// Reset the password
async function resetPassword(userData, newPassword) {
    try {
        console.log("Resetting password for user:", userData.email);

        // Find the user by their ID using userModel
        const user = await User.findById(userData._id);  // Use userModel to find the user by ID

        if (!user) {
            throw new Error("User not found");
        }

        // Hash the new password before saving
        const hashedPassword = await hashPassword(newPassword);

        // Update the user's password and clear the reset token fields
        user.password = hashedPassword;
        user.resetToken = undefined;  // Clear the reset token
        user.resetTokenExpiration = undefined;  // Clear the reset token expiration

        // Save the updated user
        await user.save();

        console.log("Password reset successfully for:", user.email);
        return { success: true, message: "Password has been successfully reset." };
    } catch (error) {
        console.error("Error resetting password:", error);
        throw new Error("Error resetting password.");
    }
}

module.exports = { resetPassword };
