const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.SENDINBLUE_EMAIL,
    pass: process.env.SENDINBLUE_SMTP_KEY,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.SENDINBLUE_EMAIL, // Your Sendinblue email
    to: to,                             // Recipient's email
    subject: subject,                   // Subject line
    text: text,                         // Plain text content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
