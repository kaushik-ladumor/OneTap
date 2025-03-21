const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow requests from frontend
app.use((req, res, next) => {
  console.log("CORS headers set for request:", req.method, req.url); // Log CORS application
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Ensure CORS header is set
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Sign Up Route
app.post("/api/auth/signup", async (req, res) => {
  console.log("Signup request received:", req.body); // Log incoming request data
  const { email, username, password, confirmPassword } = req.body;

  if (!email || !username || !password || !confirmPassword) {
    console.log("Missing fields in signup request");
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    console.log("Passwords do not match");
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email && existingUser.username === username) {
        console.log("Email and username already exist");
        return res.status(400).json({ message: "Email and username already exist." });
      } else if (existingUser.email === email) {
        console.log("Email already exists");
        return res.status(400).json({ message: "Email already exists." });
      } else {
        console.log("Username already exists");
        return res.status(400).json({ message: "Username already exists." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token, user: { id: user._id, email, username } });
  } catch (error) {
    console.error("Signup error on server:", error);
    res.status(500).json({ message: error.message || "Server error. Please try again later." });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  console.log("Login request received:", req.body); // Log incoming request data
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Missing fields in login request");
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user: { id: user._id, email, username: user.username } });
  } catch (error) {
    console.error("Login error on server:", error);
    res.status(500).json({ message: error.message || "Server error. Please try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));