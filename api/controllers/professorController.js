const Professor = require("../models/Professor");
const uploadProfessors = async (req, res) => {
  const { professors } = req.body;
  console.log("Inserting professors:", professors);

  try {
    await Professor.insertMany(professors);
    console.log("✅ Professors inserted successfully");
    res.status(200).json({ message: "Professors uploaded" });
  } catch (err) {
    console.error("❌ Error inserting professors:", err);
    res.status(500).json({ message: err.message });
  }
};
const getAllProfessors = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.status(200).json(professors);
  } catch (err) {
    console.error("Error fetching professors:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadProfessors, getAllProfessors };
