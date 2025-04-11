const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router(); // Make sure to initialize the router

// POST login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  return res.status(200).json({
    message: "Login successful",
    role: user.role,
    userId: user._id,
  });
});

module.exports = router;
