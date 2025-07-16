const express = require("express");
const router = express.Router();
const Institution = require("../models/Institution");
const verifySession = require("../middlewares/verifySession");

// Create institution
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY", req.body); 
    const newInstitution = new Institution(req.body);
    const saved = await newInstitution.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to create institution", details: err.message });
  }
});



router.get("/:type/:name", async (req, res) => {
  const { type, name } = req.params;
  try {
    const institution = await Institution.findOne({
      name: new RegExp(`^${decodeURIComponent(name)}$`, "i"),  // case-insensitive match
      type: type.toLowerCase(),
    });
    

    if (!institution) {
      return res.status(404).json({ error: "Institution not found" });
    }

    res.json(institution);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { category,course, owner, state, city, entranceExam, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (category && category.trim() !== "") filter.category = { $regex: category, $options: "i" };
    if (course && course.trim() !== "") {
      filter["coursesAndFees.course"] = { $regex: course, $options: "i" };
    }
    if (state && state.trim() !== "") {
      const decodedState = decodeURIComponent(state);
      filter["location.state"] = { $regex: decodedState, $options: "i" };
    }
    if (city && city.trim() !== "") filter["location.city"] = { $regex: city, $options: "i" };
if (entranceExam && entranceExam.trim() !== "")
      filter["coursesAndFees.entranceExam"] = { $regex: entranceExam, $options: "i" };
    if (owner) filter.owner = { $regex: owner, $options: "i" };
    
    console.log("Filters applied:", filter);

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const institutions = await Institution.find(filter)
      .sort({ name: 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Institution.countDocuments(filter);

    res.json({
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      institutions,
      totalResults: total
    });
  } catch (err) {
    console.error("Error fetching institutions:", err);
    res.status(500).json({ error: "Failed to fetch institutions" });
  }
});


// Update institution
router.put("/:id", async (req, res) => {
  console.log("Updating ID:", req.params.id);
  console.log("Data:", req.body);
  try {
    const updated = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Institution not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update institution", details: err.message });
  }
});


// Delete institution
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Institution.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Institution not found" });
    res.json({ message: "Institution deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete institution" });
  }
});

// routes/institutionRoute.js
// POST /api/institutions/:name/add-ranking

router.post("/add-ranking/:name", verifySession, async (req, res) => {
  const { name } = req.params;
  const { agency, rank, year } = req.body;

  if (!agency || !rank || !year) {
    return res.status(400).json({ message: "agency, rank, and year are required" });
  }

  try {
    const institution = await Institution.findOne({ name: new RegExp(`^${decodeURIComponent(name)}$`, "i") });

    if (!institution) return res.status(404).json({ message: "Institution not found" });

    // Check if same agency + year exists, update it
    const existing = institution.rankings.find(r => r.agency === agency && r.year === year);
    if (existing) {
      existing.rank = rank;
    } else {
      institution.rankings.push({ agency, rank, year });
    }

    await institution.save();
    res.json({ message: "Ranking updated", rankings: institution.rankings });
  } catch (err) {
    console.error("Ranking update failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
