import React, { useState } from "react";
import axios from "axios";
import courseList from "../constants/courses";

const AddCourseDetail: React.FC = () => {
  const [slug, setSlug] = useState<string>("");
  const [specification, setSpecification] = useState<string>("");
  const [eligibility, setEligibility] = useState<string>("");
  const [avgFees, setAvgFees] = useState<string>("");
  const [careerOptions, setCareerOptions] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/courses/add", {
        slug,
        specification,
        eligibility,
        avgFees,
        careerOptions: careerOptions.split(",").map((opt) => opt.trim()),
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error("Error saving course detail:", err);
      setMessage("Failed to save course detail");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Add / Update Course Detail</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="slug" className="block font-medium mb-1">Select Course</label>
          <select
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">Select a course</option>
            {courseList.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.name} ({course.duration})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="specification" className="block font-medium mb-1">Specification</label>
          <textarea
            id="specification"
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
            rows={3}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="eligibility" className="block font-medium mb-1">Eligibility</label>
          <input
            id="eligibility"
            type="text"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="avgFees" className="block font-medium mb-1">Average Fees</label>
          <input
            id="avgFees"
            type="text"
            value={avgFees}
            onChange={(e) => setAvgFees(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="careerOptions" className="block font-medium mb-1">Career Options (comma separated)</label>
          <input
            id="careerOptions"
            type="text"
            value={careerOptions}
            onChange={(e) => setCareerOptions(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Course Detail
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default AddCourseDetail;
