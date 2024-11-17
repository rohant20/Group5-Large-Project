const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter using Sendinblue's SMTP with logging and debugging enabled
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",  // Sendinblue SMTP host
  port: 587,                    // Port for sending email
  auth: {
    user: process.env.SENDINBLUE_EMAIL,   // Your Sendinblue email address
    pass: process.env.SENDINBLUE_SMTP_KEY,  // Your Sendinblue SMTP API Key
  },
  logger: true,  // Enables logging to the console
  debug: true,   // Enables detailed debugging output for Nodemailer
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'steezee49@gmail.com',  // Your registered email
    to,  // Recipient's email
    subject,  // Email subject
    text,  // Email content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
