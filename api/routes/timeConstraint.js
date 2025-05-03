const express = require("express");
const router = express.Router();
const TimeConstraint = require("../models/TimeConstraint"); // We'll create this model

router.post("/time-constraints", async (req, res) => {
  const { reason, date, fromTime, toTime } = req.body;

  try {
    const newConstraint = new TimeConstraint({
      reason,
      date,
      fromTime,
      toTime,
    });

    await newConstraint.save();

    res.status(201).json({ message: "Time constraint saved!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
