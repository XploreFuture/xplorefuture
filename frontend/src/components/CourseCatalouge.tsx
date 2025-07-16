import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCatalogue: React.FC = () => {
  const navigate = useNavigate();

  // Define only specific courses here
  const selectedCourses = [
    { name: "B.Tech", duration: "4 Years", slug: "btech" },
    { name: "MBA", duration: "2 Years", slug: "mba" },
    { name: "MCA", duration: "3 Years", slug: "mca" },
    { name: "B.Sc", duration: "3 Years", slug: "bsc" },
    { name: "BBA", duration: "3 Years", slug: "bba" },
  ];

  const handleCourseClick = (slug: string) => {
    navigate(`/courses/${slug}`);
  };

  return (
    <div className="overflow-x-auto scrollbar-none py-4">
      <div className="flex gap-4">
        {selectedCourses.map((course, idx) => (
          <div
            key={idx}
            onClick={() => handleCourseClick(course.slug)}
            className="min-w-[150px] max-w-[150px] h-[150px] border rounded-lg p-4 bg-white shadow flex flex-col justify-center items-center hover:shadow-md transition cursor-pointer"
          >
            <h3 className="text-center text-base font-semibold text-blue-700">{course.name}</h3>
            <p className="text-center text-gray-600 text-sm mt-2">Duration: {course.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalogue;
