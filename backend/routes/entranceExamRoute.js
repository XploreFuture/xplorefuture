const express = require("express");
const router = express.Router();
const EntranceExamDetail = require("../models/EntranceExamDetail");

// Add or update entrance exam details
router.get("/:slug", async (req, res) => {
  try {
    const detail = await EntranceExamDetail.findOne({ slug: req.params.slug });
    if (!detail) return res.status(404).json({ message: "Exam detail not found" });
    res.json(detail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update exam detail
router.post("/", async (req, res) => {
  const { slug, overview, eligibility, syllabus, pattern, conductingBody, website } = req.body;

  try {
    const updated = await EntranceExamDetail.findOneAndUpdate(
      { slug },
      { overview, eligibility, syllabus, pattern, conductingBody, website },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error saving entrance exam detail:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
