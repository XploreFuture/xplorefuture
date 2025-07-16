// models/Ad.ts
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  linkUrl: { type: String, required: true },
  position: { type: String, enum: ['header', 'footer', 'content'], default: 'content' },
  isActive: { type: Boolean, default: true },
  startDate: { type: Date },
  endDate: { type: Date },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ad', adSchema);
