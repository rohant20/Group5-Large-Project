const express = require("express");
const crypto = require("crypto");
const { User } = require("../models/userModel");
const { sendEmail } = require("../sendEmail"); // Importing the sendEmail function
const { verifyToken } = require("../verifyToken"); // Import the verifyToken function
const { hashPassword } = require("../utils"); // Assuming hashPassword is defined here
const { resetPassword } = require("../controllers/resetPassword"); // Import the resetPassword function

const resetRouter = express.Router();

console.log("Reset router loaded");

// Route for requesting a password reset (forgot password)
resetRouter.post("/api/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Password reset request received for email:", email);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.warn("No user found for email:", email);
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Generate reset token and expiration
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();
    console.log("Generated reset token:", resetToken);

    const resetLink = `http://steezee.xyz/reset-password/${resetToken}`;
    const emailContent = `Click here to reset your password: ${resetLink}`;

    // Send email with the reset link
    await sendEmail(email, "Password Reset Request", emailContent);
    console.log("Password reset email sent to:", email);

    res.status(200).json({
      success: true,
      message: `Password reset email sent to ${email}`,
      resetLink, // Optional: Include for testing purposes only; remove in production
    });
  } catch (error) {
    console.error("Error in /api/forgotPassword:", error);
    res.status(500).json({ success: false, message: "Failed to process password reset request." });
  }
});

// Route for resetting the password (after clicking the reset link)
resetRouter.post("/api/resetPassword/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    console.log("Reset password request received for token:", token);

    // Verify the token (handles user lookup and expiration check)
    const verificationResult = await verifyToken(token);
    console.log("Verification result:", verificationResult);

    // If token verification fails, return the error message
    if (!verificationResult.user) {
      console.warn("Token verification failed: no user found");
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    const { user } = verificationResult; // Extract the user directly from the result
    console.log("User found during token verification:", user);

    // Proceed to reset password with the user and new password
    const result = await resetPassword(user, newPassword);
    console.log("Password reset successful for token:", token);

    res.status(200).json(result); // Send success message from resetPassword
  } catch (error) {
    console.error("Error in /api/resetPassword/:token:", error);
    res.status(400).json({ success: false, message: error.message }); // Send error response
  }
});

module.exports = { resetRouter };
