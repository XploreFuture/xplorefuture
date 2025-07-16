import React from "react";
import { useNavigate } from "react-router-dom";
import states from "../constants/states";

const LocationCatalogue: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (state: string) => {
    navigate(`/explore/${state.toLowerCase()}`);
  };

  return (
      <div className="overflow-x-auto scrollbar-none px-4">
      <div className="flex space-x-4 p-4">
        {states.map((state) => (
          <div
            key={state}
            onClick={() => handleClick(state)}
            className="min-w-[150px] max-w-[150px] h-[150px] border rounded-lg p-4 bg-white shadow flex flex-col justify-center items-center hover:shadow-md transition cursor-pointer"
          >
            <h2 className="text-base font-semibold">{state}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationCatalogue;
