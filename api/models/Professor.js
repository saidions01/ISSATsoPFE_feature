const mongoose = require("mongoose");

const ProfessorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  cin: { type: String, required: true, unique: true },
  subject: String,
  department: String,
  email: { type: String, unique: true },
});

module.exports = mongoose.model("Professor", ProfessorSchema);
