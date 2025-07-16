const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  contentTitle: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  course: String,
  internship: String,
  ratings: {
    infrastructure: Number,
    courseCurriculum: Number,
    faculty: Number,
    placement: Number,
    facilities: {
      girlSafety: Number,
      scholarship: Number,
      noRagging: Number,
      canteen: Number,
      library: Number,
    },
  },
  comments: {
    infrastructure: String,
    courseCurriculum: String,
    faculty: String,
    placement: String,
    facilities: {
      girlSafety: String,
      scholarship: String,
      noRagging: String,
      canteen: String,
      library: String,
    },
  },
}, { timestamps: true });

reviewSchema.index({ fullName: 1, contentTitle: 1 }, { unique: true });
module.exports = mongoose.model("Review", reviewSchema);
