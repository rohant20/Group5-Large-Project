const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // For future security, store hashed passwords
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
