const express = require("express");
const router = express.Router();

const {
  uploadProfessors,
  getAllProfessors,
  updateProfessor,
  deleteProfessor,
} = require("../controllers/professorController.js");

const { generateSoutenances } = require("../utils/generateTimetable");

const Professor = require("../models/Professor");
const Sujet = require("../models/SujetPFE");
const Salle = require("../models/Salle");
const Soutenance = require("../models/Soutenance");
const TimeConstraint = require("../models/TimeConstraint");

// Routes
router.post("/upload-professors", express.json(), uploadProfessors);
router.get("/professors", getAllProfessors);
router.put("/professors/:id", updateProfessor);
router.delete("/professors/:id", deleteProfessor);

router.post("/generate-timetable", async (req, res) => {
  try {
    const sujets = await Sujet.find();
    const salles = await Salle.find();
    const professors = await Professor.find();
    const timeConstraints = await TimeConstraint.find();

    const startDate = new Date("2025-06-10");
    const endDate = new Date("2025-06-20");

    await generateSoutenances({
      sujets,
      salles,
      professors,
      timeConstraints,
      startDate,
      endDate,
      saveSoutenance: async (soutenance) => await new Soutenance(soutenance).save(),
      updateSujet: async (id, update) => await Sujet.findByIdAndUpdate(id, update),
    });

    res.status(200).json({ success: true, message: "Timetable generated" });
  } catch (error) {
    console.error("Error generating timetable:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
