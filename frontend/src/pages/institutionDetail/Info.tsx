import React from "react";
import { useOutletContext } from "react-router-dom";

interface Institution {
  name: string;
  type: string;
  location: {
    city: string;
    state: string;
  };
  category: string;
  approvedBy: string;
  affiliatedTo: string;
  averageFee: string;
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
        <strong className="font-semibold">Location:</strong> {data.location.city},{" "}
        {data.location.state}
      </p>
      <p>
        <strong className="font-semibold">Approved By:</strong> {data.approvedBy}
      </p>
      <p>
        <strong className="font-semibold">Affiliated To:</strong> {data.affiliatedTo}
      </p>
    </div>
  );
};

export default Info;
