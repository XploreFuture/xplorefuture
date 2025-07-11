import React from "react";
import { useOutletContext } from "react-router-dom";

type PlacementDetails = {
  highest: string;
  median: string;
  lowest: string;
};

type Institution = {
  placementDetails: PlacementDetails;
};

const Placement: React.FC = () => {
  const { placementDetails }: Institution = useOutletContext();

  if (!placementDetails)
    return (
      <p className="p-4 text-gray-600 italic">
        No placement data available.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Placement Overview
      </h2>
      <table className="w-full border-collapse border border-gray-300">
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
            <td className="border border-gray-300 p-3">{placementDetails.highest}</td>
            <td className="border border-gray-300 p-3">{placementDetails.median}</td>
            <td className="border border-gray-300 p-3">{placementDetails.lowest}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Placement;
