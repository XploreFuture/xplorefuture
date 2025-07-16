// routes/adRoute.ts
const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');

// Track ad view
router.post('/track/view/:id', async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json({ message: 'View counted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Track ad click
router.post('/track/click/:id', async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 } });
    res.status(200).json({ message: 'Click counted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ad/add
router.post('/add', async (req, res) => {
    try {
      const ad = await Ad.create(req.body);
      res.status(201).json(ad);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  
router.get('/active', async (req, res) => {
    try {
      const now = new Date();
      const ads = await Ad.find({
        isActive: true,
        $or: [
          { startDate: { $lte: now }, endDate: { $gte: now } },
          { startDate: null, endDate: null },
          { startDate: { $exists: false }, endDate: { $exists: false } }
        ]
      });
      res.json(ads); // ✅ Make sure this returns just the array
    } catch (err) {
      res.status(500).json({ error: err.message }); // ❌ This is an object (only when there's an error)
    }
  });
  
  
  module.exports = router;