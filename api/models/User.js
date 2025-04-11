const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  cin: String,
  email: { type: String, unique: true },
  subject: String,
  department: String,
  password: String,
  role: { type: String, enum: ["admin", "professor"], default: "professor" },
});

module.exports = mongoose.model("User", userSchema);
