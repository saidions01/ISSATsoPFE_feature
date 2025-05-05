const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");
const studentRoutes = require("./routes/student.js");
const authRoutes = require("./routes/auth.js");
const uploadProfessorsRoutes = require("./routes/Professor.js");
const userRoutes = require("./routes/User.js");
const timeConstraintRoutes = require("./routes/timeConstraint");
const soutenancesRoute = require("./routes/soutenancesRoutes.js");
const Soutenance = require("./models/Soutenance.js");





const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api", uploadRoutes);
app.use("/api", studentRoutes);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api", uploadProfessorsRoutes);
app.use("/api", userRoutes);
app.post("/api/upload-students", (req, res) => {
  const students = req.body.students;

  if (!Array.isArray(students)) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  console.log("Received students:", students.length);

  res.status(200).json({ message: "Students uploaded successfully!" });
});

app.use("/api", timeConstraintRoutes);

app.get("/api/soutenances", async (req, res) => {
  try {
    const soutenances = await Soutenance.find()
      .populate("salleId", "name") 
      .populate("sujetPfeId", "title"); 

    res.json({ soutenances });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/soutenances/stats", async (req, res) => {
  try {
    const soutenances = await Soutenance.find(); // get all

    const numberOfProjects = soutenances.length;
    const totalHours = numberOfProjects * 2;

    res.json({
      totalHours,
      numberOfProjects,
    });
  } catch (error) {
    console.error("Error fetching soutenance stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

app.post("/api/test/generate-timetable", async (req, res) => {
  try {
    const result = await generateSoutenances();

    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
    } else {
      res.status(500).json({ success: false, message: "Generation failed." });
    }
  } catch (error) {
    console.error("Error generating timetable:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



mongoose
  .connect("mongodb://127.0.0.1:27017/studentUploaderDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
