const express = require("express");
const router = express.Router();
const {
  uploadProfessors,
  getAllProfessors,
} = require("../controllers/professorController.js");

router.post("/upload-professors", express.json(), uploadProfessors);
router.get("/professors", getAllProfessors);

module.exports = router;
