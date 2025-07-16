import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../constants/categories";
import states from "../constants/states";

const CategoryCatalogue: React.FC = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");

  const handleClick = (category: string) => {
    const path = `${category.toLowerCase()}${selectedState ? `-${selectedState.toLowerCase()}` : ""}`;
    navigate(`/explore/${path}`);
  };

  return (
    <div className="py-4 space-y-4">
      <div className="flex justify-start px-4">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border p-2 rounded w-full max-w-xs"
        >
          <option value="">Select State (Optional)</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto scrollbar-none px-4">
        <div className="flex gap-4">
          {categories.map((category, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(category)}
              className="min-w-[150px] max-w-[150px] h-[150px] bg-white rounded-lg shadow flex justify-center items-center hover:shadow-md transition cursor-pointer"
            >
              <h2 className="text-center text-base font-bold">{category}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCatalogue;
