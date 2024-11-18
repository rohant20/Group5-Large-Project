const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        auto: true,
    },
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
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
    }
}, {
    collection: "users"
}
);

const User = mongoose.model("users", userSchema);

module.exports = {
    User
}