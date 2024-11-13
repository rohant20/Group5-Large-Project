const express = require("express");
const nodemailer = require("nodemailer");
const { User } = require("../models/userModel"); 
const crypto = require("crypto");

const router = express.Router();

// POST: /forgotPassword
router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  // Find the user in the database by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration

  // Save the reset token and expiration time to the user's record
  user.resetToken = resetToken;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  // Create a transporter for Nodemailer to send the email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Set up the email data
  const resetLink = `http://localhost:8000/reset-password/${resetToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `Click here to reset your password: ${resetLink}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: `Password reset email sent to ${email}`,
      resetLink: resetLink,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send reset email." });
  }
});

module.exports = router;
