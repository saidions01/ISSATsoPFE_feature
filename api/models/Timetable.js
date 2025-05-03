const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  soutenanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Soutenance",
    required: true,
  },
  date: { type: Date, required: true },
  salleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salle",
    required: true,
  },
});

module.exports = mongoose.model("Timetable", TimetableSchema);
