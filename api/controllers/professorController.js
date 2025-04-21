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

// Update professor
const updateProfessor = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updated = await Professor.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Professor not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating professor", error });
  }
};

const deleteProfessor = async (req, res) => {
  try {
    const deleted = await Professor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Professor not found" });
    }

    res.status(200).json({ message: "Professor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting professor", error });
  }
};

module.exports = {
  uploadProfessors,
  getAllProfessors,
  updateProfessor,
  deleteProfessor,
};
