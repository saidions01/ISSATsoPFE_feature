const mongoose = require("mongoose");

const SoutenanceSchema = new mongoose.Schema({
  sujetPfeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SujetPFE",
    required: true,
  },
  salleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salle",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  fichierPdf: { type: String }, // URL to the uploaded PDF maybe?
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  assignedProfessors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Professors evaluating
});

module.exports = mongoose.model("Soutenance", SoutenanceSchema);
