import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for colleges, courses, exams..."
        className="p-2 border rounded w-full"
      />
      <button
        onClick={handleSearch}
        disabled={!query.trim()}
        className={`ml-2 px-4 py-2 rounded text-white ${
          query.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
