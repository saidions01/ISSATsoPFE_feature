const express = require("express");
const router = express.Router();
const Student = require("../models/Student.js");

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/upload-students", async (req, res) => {
  try {
    const students = req.body.students;

    if (!students || !Array.isArray(students)) {
      return res.status(400).json({ error: "Invalid students data" });
    }

    await Student.insertMany(students);
    res.json({ message: "Students uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
