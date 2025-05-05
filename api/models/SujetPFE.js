const mongoose = require("mongoose");

const SujetPFESchema = new mongoose.Schema({
  title: { type: String , required: true},
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  assignedProfessorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("SujetPFE", SujetPFESchema);
