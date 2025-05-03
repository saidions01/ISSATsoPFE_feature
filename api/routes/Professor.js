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
router.post("/upload-professors", express.json(), uploadProfessors);
router.get("/professors", getAllProfessors);
router.put("/professors/:id", updateProfessor);
router.delete("/professors/:id", deleteProfessor);
router.post("/generate-timetable", async (req, res) => {
  try {
    await generateSoutenances(); // Call the function to generate the timetable
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error generating timetable:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
