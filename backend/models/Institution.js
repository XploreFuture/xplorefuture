const mongoose = require("mongoose");

const rankingSchema = new mongoose.Schema({
  agency: { type: String, required: false , default: "" },     // e.g. "NIRF", "India Today"
  rank: { type: Number, required: false , default: "" },       // e.g. 15
  year: { type: Number, required: false , default: "" },       // e.g. 2024
});

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, enum: ['Government', 'Private', 'Public'], required: true },
  type: { type: String, enum: ['college', 'university'], required: true },
  location: {
     place: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  establishedYear: { type: Number, required: true, min: 1700, max: new Date().getFullYear() },
  category: { type: String },
  campusArea: { type: String, required: false },
  numDepartments: { type: Number, required: false },
  affiliatedTo: { type: String, required: false },
  approvedBy: { type: String, required: false },
  famousCourse: { type: String, required: false },
  averageFee: { type: String,required: false },
  coursesAndFees: [
    {
      course: { type: String, required: true },
      fees: { type: String, required: true },
      duration: { type: String, required: true },
      entranceExam: [{ type: String }], 
    },
  ],  courseSpecifications: [{ course: String, details: String }], // Table
   placementDetails: {
    highest: { type: String, default: "Data Not Available" },  // ✅ Fixed Default
    median: { type: String, default: "Data Not Available" },  
    lowest: { type: String, default: "Data Not Available" },  
  },
  companiesVisited: [{ type: String }],
  announcements: [{ type: String }],
  additionalInfo: { type: String },
  events: {
    type: [
      {
        title: { type: String, required: false },
        date: { type: Date, required: false },
      }
    ],
    default: [], // ✅ Ensures it's an empty array if not provided
  }
  ,

  // Scholarship Section
  scholarship: {
    type: String,
    default: "", // or make it required based on your use case
  },

  // Gallery Section
  gallery: {
    type: [
      {
        imageUrl: { type: String },
        caption: { type: String, default: "" }
      }
    ],
    default: []
  },
  // List of announcements
  facilities: {
    infrastructure: { type: String, enum: ["Available", "Not Available"], default: "Available" },
    laboratories: { type: String, enum: ["Available", "Not Available"], default: "Available" },
    sportsFacilities: { type: String, enum: ["Available", "Not Available"], default: "Available" },
    hostel: { type: String, enum: ["Available", "Not Available"], default: "Available" },
    smartClassroom: { type: String, enum: ["Available", "Not Available"], default: "Available" },
  },
  rankings: [rankingSchema],
});

const Institution = mongoose.model("Institution", institutionSchema);
module.exports = Institution;
