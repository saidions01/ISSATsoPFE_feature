const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const Student = require("../models/Student");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const students = data.map((entry) => ({
      name: entry.name,
      lastName: entry.lastName,
      cin: entry.cin,
      numInscription: entry.numInscription,
      fieldOfStudy: entry.fieldOfStudy,
      department: entry.department,
    }));

    await Student.insertMany(students);
    res.status(200).json({ message: "Students uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
