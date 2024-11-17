const express = require("express");
const crypto = require("crypto");
const { User } = require("../models/userModel");
const { sendEmail } = require("../sendEmail");  // Importing the sendEmail function
const { verifyToken } = require("../verifyToken");  // Import the verifyToken function
const { hashPassword } = require("../utils");  // Assuming hashPassword is defined here
const { resetPassword } = require("../controllers/resetPassword");  // Import the resetPassword function

const resetRouter = express.Router();

console.log("resetRouter loaded");

// Route for requesting a password reset (forgot password)
resetRouter.post("/api/forgotPassword", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  // Generate reset token and expiration
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiration = Date.now() + 3600000; // 1 hour

  user.resetToken = resetToken;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  const resetLink = `http://localhost:8000/reset-password/${resetToken}`;
  const emailContent = `Click here to reset your password: ${resetLink}`;

  try {
    await sendEmail(email, "Password Reset Request", emailContent);
    res.status(200).json({
      success: true,
      message: `Password reset email sent to ${email}`,
      resetLink,
    });
  } catch (error) {
    console.error("Failed to send reset email:", error);  // Log detailed error
    res.status(500).json({ success: false, message: "Failed to send reset email." });
  }
});

// Route for resetting the password (after clicking the reset link)
resetRouter.post("/api/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // Verify the token
  const verificationResult = await verifyToken(token);
  if (!verificationResult.success) {
    return res.status(400).json(verificationResult); // Return error if token is invalid or expired
  }

  try {
    // Use resetPassword function to reset the password
    const result = await resetPassword(token, newPassword);
    res.status(200).json(result);  // Send success message from resetPassword
  } catch (error) {
    console.error("Error resetting password:", error);  // Log the error
    res.status(400).json({ success: false, error: error.message });  // Send error response
  }
});

module.exports = { resetRouter };
