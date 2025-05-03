const mongoose = require("mongoose");

const DepartementSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Departement", DepartementSchema);
