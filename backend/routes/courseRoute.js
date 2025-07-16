const express = require("express");
const CourseDetail = require( "../models/CourseDetails");


const router = express.Router();

// Get course detail by slug
router.get("/:slug", async (req, res) => {
  try {
    const course = await CourseDetail.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error("Error fetching course detail:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST to add or update course detail
router.post("/add", async (req, res) => {
  const { slug, specification, careerOptions, eligibility, avgFees } = req.body;

  if (!slug) {
    return res.status(400).json({ message: "Slug is required" });
  }

  try {
    const updated = await CourseDetail.findOneAndUpdate(
      { slug },
      { specification, careerOptions, eligibility, avgFees },
      { new: true, upsert: true } // creates if not exists
    );
    res.json({ message: "Course detail saved successfully", course: updated });
  } catch (err) {
    console.error("Error saving course detail:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
