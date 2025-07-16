import React, { useEffect, useState } from "react";
import { useParams, Outlet, NavLink, useLocation } from "react-router-dom";
import axios from "axios";

interface Institution {
  name: string;
  type: string;
  owner?: string;
  establishedYear?: number;
  location: {
    place?: string;
    city: string;
    state: string;
    country?: string;
  };
  approvedBy: string;
  affiliatedTo: string;
  category: string;
  averageFee: string;
}

const InstitutionDetailLayout: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const type = location.pathname.includes("/college/") ? "college" : "university";

  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/api/${type}/${encodeURIComponent(name)}`)
      .then((res) => setInstitution(res.data))
      .catch((err) => {
        console.error("Institution fetch failed:", err);
        setInstitution(null);
      })
      .finally(() => setLoading(false));
  }, [name, type]);

  if (loading)
    return <div className="p-4 text-gray-600">Loading institution details...</div>;

  if (!institution)
    return <div className="p-4 text-red-600">Institution not found.</div>;

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-6 py-2 border-b-2 ${
      isActive
        ? "border-blue-600 text-blue-600 font-semibold"
        : "border-transparent text-gray-700 hover:text-blue-600 hover:border-blue-400"
    } transition whitespace-nowrap`;

  return (
    <div className="w-full bg-gray-50 min-h-screen ">
      {/* Sticky Institution Header */}
      <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {institution.name} – Fees, Courses, Facilities, Ranking, Placement
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {institution.owner || "Ownership Unknown"} &nbsp;|&nbsp;
            Established {institution.establishedYear || "N/A"} &nbsp;|&nbsp;
            {institution.location.city}, {institution.location.state}
          </p>
        </div>

        {/* Sticky Inner Nav Tabs */}
        <nav className="bg-white border-t border-b">
          <div className="max-w-6xl mx-auto px-2 flex overflow-x-auto">
            <NavLink to={`/${type}/${name}/info`} className={navLinkClasses}>
              Info
            </NavLink>
            <NavLink to={`/${type}/${name}/courses`} className={navLinkClasses}>
              Courses
            </NavLink>
            <NavLink to={`/${type}/${name}/placement`} className={navLinkClasses}>
              Placement
            </NavLink>
            <NavLink to={`/${type}/${name}/facilities`} className={navLinkClasses}>
              Facilities
            </NavLink>
            <NavLink to={`/${type}/${name}/reviews`} className={navLinkClasses}>
              Reviews
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet context={institution} />
      </main>
    </div>
  );
};

export default InstitutionDetailLayout;
