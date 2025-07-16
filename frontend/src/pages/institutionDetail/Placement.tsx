import React from "react";
import { useOutletContext } from "react-router-dom";

type PlacementDetails = {
  highest: string;
  median: string;
  lowest: string;
};

type Institution = {
  name: string;
  type: string;
  category: string;
  placementDetails: PlacementDetails;
  companiesVisited: string[];
};

const Placement: React.FC = () => {
  const {
    name,
    type,
    category,
    placementDetails,
    companiesVisited,
  }: Institution = useOutletContext();

  if (!placementDetails)
    return (
      <p className="p-4 text-gray-600 italic">
        No placement data available.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2 text-blue-700">
        Placement Overview
      </h2>

      <div className="mb-4 space-y-1 text-sm text-gray-700">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Category:</strong> {category}</p>
      </div>

      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th scope="col" className="border border-gray-300 p-3 text-left">
              Highest Package
            </th>
            <th scope="col" className="border border-gray-300 p-3 text-left">
              Median Package
            </th>
            <th scope="col" className="border border-gray-300 p-3 text-left">
              Lowest Package
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border border-gray-300 p-3">
              {placementDetails.highest || "N/A"}
            </td>
            <td className="border border-gray-300 p-3">
              {placementDetails.median || "N/A"}
            </td>
            <td className="border border-gray-300 p-3">
              {placementDetails.lowest || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-800">
          Companies Visited
        </h3>
        {companiesVisited && companiesVisited.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-700">
            {companiesVisited.map((company, index) => (
              <li key={index}>{company}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">
            No companies data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Placement;
