const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/User"); // Ensure User model is correctly set up
const { signupValidation } = require("../Middlewares/AuthValidation");

const router = express.Router();

router.post("/signup", signupValidation, async (req, res) => {
  console.log(" Signup request received:", req.body); // Add this for debugging

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  console.log("✅ User created:", newUser); // Add this for debugging

  res.status(201).json({ message: "Signup successful! Please login." });
});

// Login Route
// router.post("/login", loginValidation, login);
module.exports = router;