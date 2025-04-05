const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  cin: String,
  numInscription: String,
  fieldOfStudy: String,
  department: String,
});

module.exports = mongoose.model("Student", studentSchema);
