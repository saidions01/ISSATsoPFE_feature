// models/TimeConstraint.js
const mongoose = require("mongoose");

const timeConstraintSchema = new mongoose.Schema({
  reason: { type: String, required: true },
  date: { type: String, required: true },
  fromTime: { type: String, required: true },
  toTime: { type: String, required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "Professor" },
});

module.exports = mongoose.model("TimeConstraint", timeConstraintSchema);
