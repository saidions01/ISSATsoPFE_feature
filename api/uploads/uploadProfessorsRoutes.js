const express = require("express");
const multer = require("multer");
const router = express.Router();
const XLSX = require("xlsx");
const Professor = require("../models/Professor"); // Assuming you have a model for professors

// Multer configuration for file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Route to handle professors file upload
router.post("/upload-professors", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Parse the .xlsx file
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON (assumes professors data is in the first sheet)
    const professorsData = XLSX.utils.sheet_to_json(sheet);
    console.log("Parsed professors data:", professorsData);

    // Save the professors data into the database
    for (const professor of professorsData) {
      // Create new professor records in the database
      const newProfessor = new Professor(professor);
      await newProfessor.save();
    }

    res.status(200).json({ message: "Professors data uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload professors data" });
  }
});

module.exports = router;
