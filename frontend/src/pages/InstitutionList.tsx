import React, { useEffect, useState } from "react";
import api from "../api";

type Institution = {
  _id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
};

const InstitutionList = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await api.get<{ institutions: Institution[] }>("/institution");
        setInstitutions(res.data.institutions);
      } catch (err) {
        console.error("Error fetching institutions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Institutions</h2>
      {loading ? (
        <p>Loading institutions...</p>
      ) : institutions.length === 0 ? (
        <p>No institutions found.</p>
      ) : (
        <ul>
          {institutions.map((inst) => (
            <li key={inst._id} className="border p-2 mb-2 rounded">
              <strong>{inst.name}</strong> - {inst.location.city}, {inst.location.state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstitutionList;
