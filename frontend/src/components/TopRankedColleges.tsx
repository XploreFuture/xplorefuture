import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RankingAgency = "nirf" | "iirf" | "indiatoday" | "xplorefuture";

interface Ranking {
  agency: string;
  rank: number;
  year: number;
}

interface College {
  _id: string;
  name: string;
  slug: string;
  type: string;
  rankings?: Ranking[];
}

const TopRankedColleges: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedAgency, setSelectedAgency] = useState<RankingAgency>("nirf");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api");
        setColleges(res.data.institutions || []);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setColleges([]);
      }
    };
    fetchColleges();
  }, []);

  const getRank = (college: College, agency: RankingAgency, year: number) => {
    return college.rankings?.find(
      (r) =>
        r.agency.toLowerCase() === agency.toLowerCase() &&
        r.year === year
    )?.rank;
  };

  const sortedColleges = colleges
    .map((college) => ({
      ...college,
      rank: getRank(college, selectedAgency, 2024),
    }))
    .filter((c) => c.rank !== undefined)
    .sort((a, b) => (a.rank as number) - (b.rank as number))
    .slice(0, 10);

  const handleCollegeClick = (college: College) => {
  navigate(`/${college.type.toLowerCase()}/${encodeURIComponent(college.name)}`);
};


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Top 10 Colleges ({selectedAgency.toUpperCase()} Rankings)
        </h1>
        <select
          value={selectedAgency}
          onChange={(e) => setSelectedAgency(e.target.value as RankingAgency)}
          className="border px-3 py-2 rounded"
        >
          <option value="nirf">NIRF</option>
          <option value="iirf">IIRF</option>
          <option value="indiatoday">India Today</option>
          <option value="xplorefuture">XploreFuture</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedColleges.length === 0 ? (
          <p>No rankings available for selected agency.</p>
        ) : (
          sortedColleges.map((college) => (
            <div
              key={college._id}
              onClick={() => handleCollegeClick(college)}
              className="border rounded p-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <h2 className="text-lg font-bold mb-2">{college.name}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopRankedColleges;
