const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Mock users database
const users = [
    { email: 'user@example.com', username: 'user1', password: 'oldpassword' }
];

// Forgot Password Route
app.post('/forgotPassword', (req, res) => {
    const { email } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).send({ error: 'Email not found' });
    }

    // Generate a reset token (this could be a UUID or any unique identifier)
    const resetToken = 'sample-reset-token'; // Simulate a reset token

    // Create a reset link with localhost
    const resetLink = `http://localhost:8000/resetPassword/${resetToken}`;
    
    // Mock email sending function
    console.log(`Sending password reset email with link: ${resetLink}`);
    
    res.send({ success: true, message: `Password reset email sent to ${email}` });
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
