import React from "react";

interface Ranking {
  agency: string;
  rank: number;
  year: number;
}

interface RankingsProps {
  rankings: Ranking[];
}

const Rankings: React.FC<RankingsProps> = ({ rankings }) => {
  if (!rankings || rankings.length === 0) {
    return <p className="text-gray-600">No rankings available</p>;
  }

  // Find best (minimum) rank
  const bestRanking = rankings.reduce((prev, curr) =>
    curr.rank < prev.rank ? curr : prev
  );

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <p>
        <strong>{bestRanking.agency} Rank</strong> #{bestRanking.rank}
      </p>

    </div>
  );
};

export default Rankings;
