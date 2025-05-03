const express = require("express");
const router = express.Router();

const Soutenance = require("../models/Soutenance.js");

app.get("/api/soutenances", async (req, res) => {
  try {
    const soutenances = await Soutenance.find()
      .populate("salleId", "name") // Only bring salle name
      .populate("sujetPfeId", "title"); // Only bring sujetPfe title

    res.json({ soutenances });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
