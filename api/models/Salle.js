const mongoose = require("mongoose");

const SalleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
});

module.exports = mongoose.model("Salle", SalleSchema);
