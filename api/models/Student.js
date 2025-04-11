const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  cin: String,
  numInscription: String,
  fieldOfStudy: String,
  department: String,
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "Professor" },
});

module.exports = mongoose.model("Student", studentSchema);
