const mongoose = require("mongoose");
const User = require("../models/User"); // <--- MISSING
const Salle = require("../models/Salle");
const Departement = require("../models/Departement");
const SujetPFE = require("../models/SujetPFE");
const Student = require("../models/Student");

mongoose
  .connect("mongodb://127.0.0.1:27017/studentUploaderDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB connected");

    const professors = await User.find({ role: "professor" });
    const students = await Student.find();
    const departments = await Departement.insertMany([
      { name: "Computer Science" },
      { name: "Electrical Engineering" },
      { name: "Mechanical Engineering" },
    ]);
    console.log("✅ Departments added");

    const salles = await Salle.insertMany([
      { name: "Room A1", capacity: 30 },
      { name: "Room B2", capacity: 50 },
      { name: "Room C3", capacity: 20 },
    ]);
    console.log("✅ Salles added");

    const sujets = [
      {
        title: "Machine Learning for Data Science",
        description: "A deep dive into ML concepts.",
      },
      {
        title: "AI for Healthcare",
        description: "Exploring AI applications in the medical field.",
      },
      {
        title: "Data Security",
        description: "Understanding data protection techniques.",
      },
    ];

    for (let i = 0; i < sujets.length; i++) {
      const randomProfessor =
        professors[Math.floor(Math.random() * professors.length)];

      const randomStudent =
        students[Math.floor(Math.random() * students.length)];

      const newSujet = new SujetPFE({
        title: sujets[i].title,
        description: sujets[i].description,
        assignedTo: randomProfessor._id,
        studentId: randomStudent._id,
      });

      await newSujet.save();
    }

    console.log("🎉 All mock data inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
