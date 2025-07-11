const mongoose = require("mongoose");

const courseDetailSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  specification: String,
  careerOptions: [String],
  eligibility: String,
  avgFees: String,
  // Add other fields as needed
});

const CourseDetail = mongoose.model("CourseDetail", courseDetailSchema);
module.exports = CourseDetail;
