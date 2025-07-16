const mongoose = require("mongoose");

const entranceExamDetailSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  overview: String,
  eligibility: String,
  syllabus: String,
  pattern: String,
  conductingBody: String,
  website: String,
});

const EntranceExamDetail = mongoose.model("EntranceExamDetail", entranceExamDetailSchema);

module.exports = EntranceExamDetail;
