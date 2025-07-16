import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Define the structure of the institution
interface Institution {
  _id: string;
  name: string;
  category?: string;
  famousCourse?: string;
  entranceExam?: string;
  // Add any other fields you want to edit
}

const EditInstitution: React.FC = () => {
  const { name, type } = useParams<{ name: string; type: string }>();
  const [formData, setFormData] = useState<Institution | null>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  // Fetch current institution data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Institution>(
          `http://localhost:5000/api/${type}/${encodeURIComponent(name || "")}`
        );
        setFormData(response.data);
      } catch (err) {
        console.error("Failed to fetch institution", err);
      }
    };
    fetchData();
  }, [type, name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await axios.put(`http://localhost:5000/api/${formData._id}`, formData);
      setMessage("Institution updated successfully!");
      setTimeout(() => navigate(`/${type}/${name}/info`), 1000);
    } catch (err) {
      console.error("Update failed", err);
      setMessage("Update failed.");
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Edit Institution</h2>

      <label className="block">
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
          required
        />
      </label>

      <label className="block">
        Category:
        <input
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block">
        Famous Course:
        <input
          name="famousCourse"
          value={formData.famousCourse || ""}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block">
        Entrance Exam:
        <input
          name="entranceExam"
          value={formData.entranceExam || ""}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      {/* Add more fields as needed following same structure */}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Save Changes
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default EditInstitution;
