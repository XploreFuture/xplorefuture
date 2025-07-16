import React, { useState } from "react";
import axios from "axios";
import entranceExam from "../constants/entranceExam"; // adjust import path accordingly

const AddEntranceExamDetails: React.FC = () => {
  const [slug, setSlug] = useState("");
  const [overview, setOverview] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [pattern, setPattern] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [conductingBody, setConductingBody] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
     const { data } = await axios.post("http://localhost:5000/api/entrance-exams", {
  slug,
  overview,
  eligibility,
  syllabus,
  pattern,
  conductingBody,
  website,
});
setMessage(data.message || "Entrance exam details saved successfully");

      setMessage("Entrance exam details saved successfully");
      // Clear form
      setSlug("");
      setOverview("");
      setEligibility("");
      setPattern("");
      setSyllabus("");
      setConductingBody("");
      setWebsite("");
    } catch (err) {
      console.error("Error saving entrance exam detail:", err);
      setMessage("Failed to save entrance exam detail");
    }
  };

  const handleExamSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = e.target.value;
    setSlug(selectedSlug);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Add Entrance Exam Details</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Select Exam</label>
          <select
            value={slug}
            onChange={handleExamSelect}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an Exam</option>
            {entranceExam.map((exam) => (
              <option key={exam.slug} value={exam.slug}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Exam Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="e.g. jee-main"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Overview</label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={3}
            placeholder="Brief overview of the exam"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Eligibility</label>
          <textarea
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            rows={3}
            placeholder="Eligibility criteria"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Exam Pattern</label>
          <textarea
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            rows={3}
            placeholder="Exam pattern details"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Syllabus</label>
          <textarea
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            rows={3}
            placeholder="Exam syllabus"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Conducting Body</label>
          <input
            type="text"
            value={conductingBody}
            onChange={(e) => setConductingBody(e.target.value)}
            placeholder="e.g. NTA"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Official Website</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
        >
          Save Details
        </button>
      </form>
    </div>
  );
};

export default AddEntranceExamDetails;
