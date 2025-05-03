const mongoose = require("mongoose");
const Soutenance = require("../models/Soutenance");
const SujetPFE = require("../models/SujetPFE");
const Salle = require("../models/Salle");
const User = require("../models/User");

async function generateSoutenances() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/studentUploaderDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    const sujets = await SujetPFE.find();
    const salles = await Salle.find();
    const professors = await User.find({ role: "professor" });

    if (sujets.length === 0 || salles.length === 0 || professors.length < 3) {
      console.error("❌ Not enough data to generate soutenances");
      process.exit(1);
    }

    const startDate = new Date(); // today
    startDate.setHours(0, 0, 0, 0); // clean time part

    const soutenancesPerDay = 5;
    const timeSlots = ["08:00", "09:30", "11:00", "13:00", "14:30"];

    let currentDay = new Date(startDate);

    let timeSlotIndex = 0;

    for (let i = 0; i < sujets.length; i++) {
      if (timeSlotIndex >= soutenancesPerDay) {
        // move to next day
        currentDay.setDate(currentDay.getDate() + 1);
        timeSlotIndex = 0;
      }

      const randomSalle = salles[Math.floor(Math.random() * salles.length)];
      const assignedProfessors = [];

      // Pick 3 random professors
      while (assignedProfessors.length < 3) {
        const randomProf =
          professors[Math.floor(Math.random() * professors.length)];
        if (!assignedProfessors.includes(randomProf._id)) {
          assignedProfessors.push(randomProf._id);
        }
      }

      const soutenance = new Soutenance({
        sujetPfeId: sujets[i]._id,
        salleId: randomSalle._id,
        date: new Date(currentDay), // date only
        time: timeSlots[timeSlotIndex],
        assignedProfessors,
      });

      await soutenance.save();
      console.log(
        `✅ Soutenance scheduled for Sujet ${sujets[i].title} at ${timeSlots[timeSlotIndex]}`
      );

      timeSlotIndex++;
    }

    console.log("🎉 All soutenances generated!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error generating soutenances:", err);
    process.exit(1);
  }
}

module.exports = { generateSoutenances };
