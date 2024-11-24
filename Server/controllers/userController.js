const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

// Fetch user by ID
const getUserByID = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
const updateUser = asyncHandler(async (req, res) => {
  const { _id, firstname, lastname, email, username } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { firstname, lastname, email, username },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getUserByID, updateUser };
