import React from "react";
import { useOutletContext } from "react-router-dom";
import Rankings from "../../components/institutionranking";

interface Ranking {
  agency: string;
  rank: number;
  year: number;
}

interface Institution {
  name: string;
  type: string;
  location: {
    place: string;
    city: string;
    state: string;
    country: string;
  };
  category: string;
  approvedBy: string;
  affiliatedTo: string;
  averageFee: string;
  owner: string;
  establishedYear: string;
  famousCourse: string;
  rankings: Ranking[]; // ✅ Added rankings
}

const Info: React.FC = () => {
  const data = useOutletContext<Institution>();

  return (
    <div className="p-4 bg-white rounded shadow-sm space-y-2">
      <h1 className="text-2xl font-bold text-blue-700">{data.name}</h1>

      <p>
        <strong className="font-semibold">Type:</strong> {data.type}
      </p>

      <p>
        <strong className="font-semibold">Category:</strong> {data.category}
      </p>

      <p>
        <strong className="font-semibold">Owner:</strong> {data.owner}
      </p>

      <p>
        <strong className="font-semibold">Established Year:</strong> {data.establishedYear}
      </p>

      <p>
        <strong className="font-semibold">Famous Course:</strong> {data.famousCourse}
      </p>

      <p>
        <strong className="font-semibold">Average Fee:</strong> {data.averageFee}
      </p>

      {/* ✅ Rankings Component Integration */}
      <Rankings rankings={data.rankings} />

      <p>
        <strong className="font-semibold">Approved By:</strong> {data.approvedBy}
      </p>

      <p>
        <strong className="font-semibold">Affiliated To:</strong> {data.affiliatedTo}
      </p>

      <p>
        <strong className="font-semibold">Location:</strong> {data.location.place}, {data.location.city}, {data.location.state}, {data.location.country}
      </p>
    </div>
  );
};

export default Info;
