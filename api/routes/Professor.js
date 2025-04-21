const express = require("express");
const router = express.Router();
const {
  uploadProfessors,
  getAllProfessors,
  updateProfessor,
  deleteProfessor,
} = require("../controllers/professorController.js");

const Professor = require("../models/Professor");
router.post("/upload-professors", express.json(), uploadProfessors);
router.get("/professors", getAllProfessors);
router.put("/professors/:id", updateProfessor);
router.delete("/professors/:id", deleteProfessor);
module.exports = router;
