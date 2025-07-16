// routes/ranking.js
const express = require("express");
const router = express.Router();
const Institution = require("../models/Institution");

// Get top 10 colleges by ranking agency
router.get("/top/:agency", async (req, res) => {
  const { agency } = req.params;
  try {
    const rankingField = agency + "Rank"; // e.g. nirfRank, iirfRank

    const colleges = await Institution.find({ [rankingField]: { $exists: true } })
      .sort({ [rankingField]: 1 })
      .limit(10);

    res.json(colleges);
  } catch (err) {
    console.error(`Error fetching top ${agency} colleges:`, err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
