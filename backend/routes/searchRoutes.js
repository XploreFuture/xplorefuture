// routes/searchRoutes.js

const express = require("express");
const router = express.Router();
const Institution = require("../models/Institution");

router.get("/suggestions", async (req, res) => {
  const { q } = req.query;
  console.log("Query for suggestions:", q);

  if (!q || q.trim() === "") {
    return res.json([]);
  }

  try {
    const regex = new RegExp(q, "i");

    const institutions = await Institution.find({
      $or: [
        { name: regex },
        { "location.state": regex },
        { "location.city": regex },
        { category: regex },
        { "coursesAndFees.course": regex },
        { "coursesAndFees.entranceExam": regex },
      ],
    })
      .limit(5)
      .select("name location category coursesAndFees");

    const suggestions = institutions.map((inst) => ({
      name: inst.name,
      category: inst.category,
      state: inst.location.state,
      city: inst.location.city,
    }));

    res.json(suggestions);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

module.exports = router;
