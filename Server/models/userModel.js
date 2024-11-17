const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Simple regex for email validation
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    },
    resetToken: { // Add resetToken field to store the reset password token
        type: String,
    },
    resetTokenExpiration: { // Add resetTokenExpiration field to store the expiration date of the token
        type: Date,
    }
}, {
    collection: "users"
});

const User = mongoose.model("users", userSchema);

module.exports = {
    User
};
