const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const verifySession = require("../middlewares/verifySession");


// Add review
router.post("/add", verifySession,async (req, res) => {
  const { contentTitle, userName, userEmail, course, internship, ratings, comments } = req.body;

  if (!contentTitle || !userName) {
    return res.status(400).json({ message: "contentTitle and userName are required" });
  }

  try {
    const review = new Review({
      contentTitle,
      userName,
      userEmail,
      course,
      internship,
      ratings,
      comments,
    });

    await review.save();
    res.status(201).json({ message: "Review submitted successfully." });
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ error: "Error submitting review", details: err.message });
  }
});
 
// Get all reviews for a content
router.get("/:contentTitle", async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const contentTitle = decodeURIComponent(req.params.contentTitle);

    const reviews = await Review.find({ contentTitle })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({ contentTitle });

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

router.get("/average/:institutionName", async (req, res) => {
  try {
    const result = await Review.aggregate([
      { $match: { contentTitle: req.params.institutionName } },
      {
        $group: {
          _id: null,
          avgInfrastructure: { $avg: "$ratings.infrastructure" },
          avgCourseCurriculum: { $avg: "$ratings.courseCurriculum" },
          avgFaculty: { $avg: "$ratings.faculty" },
          avgPlacement: { $avg: "$ratings.placement" },
        },
      },
    ]);

    res.json(result[0] || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate average ratings" });
  }
});


module.exports = router;
