const express = require("express");
const { getUserByID, updateUser } = require("../controllers/userController");

const router = express.Router();

// Route to fetch user by ID
router.post("/fetchUserByID", getUserByID);

// Route to update user
router.put("/updateUser", updateUser);

module.exports = router;
