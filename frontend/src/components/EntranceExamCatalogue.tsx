import React from "react";
import { useNavigate } from "react-router-dom";
import entranceExams from "../constants/entranceExam"; // adjust the path as per your project

const EntranceExamCatalogue: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (slug: string) => {
    navigate(`/entrance-exams/${slug}`);
  };

  return (
      <div className="overflow-x-auto scrollbar-none px-4">
      <div className="flex space-x-4 p-4">
        {entranceExams.map((exam) => (
          <div
            key={exam.slug}
            onClick={() => handleClick(exam.slug)}
            className="min-w-[150px] max-w-[150px] h-[150px] border rounded-lg p-4 bg-white shadow flex flex-col justify-center items-center hover:shadow-md transition cursor-pointer"
          >
            <h2 className="text-base font-semibold">{exam.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntranceExamCatalogue;
