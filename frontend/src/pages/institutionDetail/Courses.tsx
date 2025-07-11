import React from "react";
import { useOutletContext } from "react-router-dom";

type Course = {
  course: string;
  duration: string;
  fees?: string;
};

type Institution = {
  coursesAndFees: Course[];
};

const Courses: React.FC = () => {
  const { coursesAndFees }: Institution = useOutletContext();

  if (!coursesAndFees || coursesAndFees.length === 0) {
    return (
      <div className="p-4 text-gray-600 text-sm">
        No courses available.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Courses Offered
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {coursesAndFees.map((course, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow-sm hover:shadow-md transition bg-white"
          >
            <h3 className="text-lg font-medium text-blue-700">
              {course.course}
            </h3>
            <p className="text-sm text-gray-600">Duration: {course.duration}</p>
            {course.fees && (
              <p className="text-sm text-gray-600">
                Fees: ₹{course.fees}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
