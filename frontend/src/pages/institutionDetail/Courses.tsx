import React from "react";
import { useOutletContext } from "react-router-dom";

type Course = {
  course: string;
  duration: string;
  fees?: string;
  entranceExam?: string[];
};

type Institution = {
  coursesAndFees: Course[];
  averageFee: string;
  famousCourse: string;
  owner: string;
  category: string;
  type: string;
};

const Courses: React.FC = () => {
  const {
    coursesAndFees,
    averageFee,
    famousCourse,
    owner,
    category,
    type,
  }: Institution = useOutletContext();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Courses Offered
      </h2>

      <div className="mb-4 space-y-1 text-sm text-gray-700">
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Owner:</strong> {owner}</p>
        <p><strong>Famous Course:</strong> {famousCourse}</p>
        <p><strong>Average Fee:</strong> {averageFee}</p>
      </div>

      {(!coursesAndFees || coursesAndFees.length === 0) ? (
        <div className="text-gray-600 text-sm">
          No courses available.
        </div>
      ) : (
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
              {course.entranceExam && course.entranceExam.length > 0 && (
                <p className="text-sm text-gray-600">
                  Entrance Exams: {course.entranceExam.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
