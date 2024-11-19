const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { User } = require('./userModel'); // Import your User model
require('dotenv').config(); // Load environment variables

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Forgot Password Route
app.post('/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body;

        // Query the database for the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: 'Email not found' });
        }

        // Generate a reset token (you can use a library like `uuid` for unique tokens)
        const resetToken = 'sample-reset-token'; // Replace with a secure token generation logic
        const resetLink = `http://localhost:8000/resetPassword/${resetToken}`;
        
        // Store reset token and expiration in the database
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration
        await user.save();
        console.log("User after saving resetToken and resetTokenExpiration:", user);
        console.log(user.resetToken, user.resetTokenExpiration);

        // Mock email sending (replace with Nodemailer logic)
        console.log(`Sending password reset email with link: ${resetLink}`);
        
        res.send({ success: true, message: `Password reset email sent to ${email}` });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

// Password Reset Route (simulating password reset)
app.get('/reset-password/:resetToken', (req, res) => {
    const { resetToken } = req.params;

    // Validate the token and allow password change if valid
    res.send(`You can reset your password here using token: ${resetToken}`);
});

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
