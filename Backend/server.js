const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/db"); // Ensure MongoDB connection
const AuthRouter = require("./Routes/AuthRouter");

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS Configuration (Fixed)
app.use(
  cors({
    origin: "http://localhost:3000/", // Ensure this matches frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/auth", AuthRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log( `Server running on port ${PORT}`));