import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface FacilitiesData {
  name?: string;
  category?: string;
  facilities?: {
    infrastructure?: string;
    laboratories?: string;
    sportsFacilities?: string;
    hostel?: string;
    smartClassroom?: string;
  };
  scholarship?: string;
}

const Facilities: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [data, setData] = useState<FacilitiesData | null>(null);
  const [loading, setLoading] = useState(true);
  const type = window.location.pathname.includes("/college/") ? "college" : "university";

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/${type}/${encodeURIComponent(name || "")}`);
        setData(res.data || {});
      } catch (err) {
        console.error("Failed to fetch facility info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [name, type]);

  if (loading)
    return (
      <div className="flex justify-center items-center p-4">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );

  if (!data) return <p className="p-4 text-red-600">No data found.</p>;

  const facilities = data.facilities || {};
  const scholarship = data.scholarship || "No scholarship information available.";

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-blue-700">{data.name}</h1>
        <p className="text-gray-700">
          <strong>Category:</strong> {data.category || "Not mentioned"}
        </p>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-4">Facilities</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>
          <strong>Infrastructure:</strong> {facilities.infrastructure || "Not mentioned"}
        </li>
        <li>
          <strong>Laboratories:</strong> {facilities.laboratories || "Not mentioned"}
        </li>
        <li>
          <strong>Sports Facilities:</strong> {facilities.sportsFacilities || "Not mentioned"}
        </li>
        <li>
          <strong>Hostel:</strong> {facilities.hostel || "Not mentioned"}
        </li>
        <li>
          <strong>Smart Classroom:</strong> {facilities.smartClassroom || "Not mentioned"}
        </li>
      </ul>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Scholarship Info</h3>
        <p className="mt-2 text-gray-700">{scholarship}</p>
      </div>
    </div>
  );
};

export default Facilities;
