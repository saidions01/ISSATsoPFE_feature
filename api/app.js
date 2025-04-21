const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");
const studentRoutes = require("./routes/student.js");
const authRoutes = require("./routes/auth.js");
const uploadProfessorsRoutes = require("./routes/Professor.js");
const userRoutes = require("./routes/User.js");
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

  // Log to verify incoming data
  console.log("Received students:", students.length);

  // Do something with the data (e.g., save to database)

  res.status(200).json({ message: "Students uploaded successfully!" });
});
mongoose
  .connect("mongodb://127.0.0.1:27017/studentUploaderDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
