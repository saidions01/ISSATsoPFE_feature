const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
