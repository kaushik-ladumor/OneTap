const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Removes unnecessary spaces
    lowercase: true, // Ensures emails are stored in lowercase
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4, // Prevent very short usernames
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Secure passwords
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique indexes are applied
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);