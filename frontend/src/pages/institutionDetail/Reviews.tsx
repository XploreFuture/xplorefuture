import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

interface FacilityRatings {
  girlSafety: number;
  scholarship: number;
  raggingFree: number;
  canteen: number;
  library: number;
}

interface FacilityComments {
  girlSafety: string;
  scholarship: string;
  raggingFree: string;
  canteen: string;
  library: string;
}

interface Ratings {
  infrastructure: number;
  courseCurriculum: number;
  faculty: number;
  placement: number;
  facilities: FacilityRatings;
}

interface Comments {
  infrastructure: string;
  courseCurriculum: string;
  faculty: string;
  placement: string;
  internship: string;
  facilities: FacilityComments;
}

interface Review {
  userName: string;
  course: string;
  internship: boolean;
  ratings: Ratings;
  comments: Comments;
}

interface StarRatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}


const REVIEWS_PER_PAGE = 5;

const Reviews: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [course, setCourse] = useState<string>("");
  const [internship, setInternship] = useState<boolean>(false);
  const [ratings, setRatings] = useState<Ratings>({
    infrastructure: 0,
    courseCurriculum: 0,
    faculty: 0,
    placement: 0,
    facilities: {
      girlSafety: 0,
      scholarship: 0,
      raggingFree: 0,
      canteen: 0,
      library: 0,
    },
  });

  const [comments, setComments] = useState<Comments>({
    infrastructure: "",
    courseCurriculum: "",
    faculty: "",
    placement: "",
    internship: "",
    facilities: {
      girlSafety: "",
      scholarship: "",
      raggingFree: "",
      canteen: "",
      library: "",
    },
  });

  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-2xl focus:outline-none ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get<{ reviews: Review[]; totalPages: number }>(
        `http://localhost:5000/api/reviews/${encodeURIComponent(name || "")}`,
        { params: { page, limit: REVIEWS_PER_PAGE }, withCredentials: true }
      );
      setReviews(res.data.reviews || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  }, [name, page]);



  const checkExistingReview = useCallback(async () => {
    try {
      const res = await axios.get<{ reviews: Review[] }>(
        `http://localhost:5000/api/reviews/${encodeURIComponent(name || "")}`,
        { withCredentials: true }
      );
      const userReviewed = res.data.reviews.some((r) => r.userName === user?.displayName || user?.email);
      setAlreadyReviewed(userReviewed);
    } catch {
      setAlreadyReviewed(false);
    }
  }, [name, user]);

  useEffect(() => {
    fetchReviews();
    checkExistingReview();
  }, [fetchReviews, checkExistingReview]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5000/api/reviews/add",
        {
          contentTitle: name,
          userName: user?.displayName || user?.email || "Anonymous",
          course,
          internship,
          ratings,
          comments,
        },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setAlreadyReviewed(true);
      fetchReviews();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setMessage(err.response.data?.message || "Failed to submit review");
      } else {
        setMessage("Failed to submit review");
      }
    }
  };

  const handleRatingChange = (field: keyof Ratings | keyof FacilityRatings, value: number) => {
    if (field in ratings.facilities) {
      setRatings((prev) => ({
        ...prev,
        facilities: {
          ...prev.facilities,
          [field]: value,
        },
      }));
    } else {
      setRatings((prev) => ({ ...prev, [field as keyof Ratings]: value }));
    }
  };

  const handleCommentChange = (field: keyof Comments | keyof FacilityComments, value: string) => {
    if (field in comments.facilities) {
      setComments((prev) => ({
        ...prev,
        facilities: {
          ...prev.facilities,
          [field]: value,
        },
      }));
    } else {
      setComments((prev) => ({ ...prev, [field as keyof Comments]: value }));
    }
  };

  return (
    <div className="w-full bg-gray-50 min-b-screen pt-6 pb-10">
      <div className="max-w-8xl mx-auto px-10">
        <h2 className="text-2xl font-bold text-gray-900">
        Student Reviews</h2>
      
      {reviews.length > 0 ? (
        <ul className="space-y-6 mt-6">
          {reviews.map((r, i) => (
            <li key={i} className="border rounded-lg p-4 shadow-sm bg-white">
              <p className="font-semibold mb-2 text-gray-900">
                {r.userName} ({r.course})
              </p>
              <p>
      <strong>Infrastructure:</strong> {Array(r.ratings?.infrastructure).fill("⭐").join("")}
      {" - "}{r.comments?.infrastructure || "No comment"}
    </p>
              <p>
              <strong>Course Curriculum:</strong> {r.ratings?.courseCurriculum}/5 {Array(r.ratings?.courseCurriculum).fill("⭐").join("")}
              {" - "}{r.comments?.courseCurriculum || "No comment"}              </p>
              <p>
              <strong>Faculty:</strong> {Array(r.ratings?.faculty).fill("⭐").join("")}
              {" - "}{r.comments?.faculty || "No comment"}              </p>
              <p>
              <strong>Placement:</strong> {Array(r.ratings?.placement).fill("⭐").join("")}
              {" - "}{r.comments?.placement || "No comment"}              </p>
              <p>
                <strong>Internship:</strong> {r.internship ? "Yes" : "No"}
              </p>
              
              {r.ratings?.facilities &&
                Object.entries(r.ratings.facilities).map(([key, val]) => {
                  const typedKey = key as keyof FacilityComments;
                  const facilityComments = r.comments?.facilities || {};
                  return (
                    <p key={key}>
                      <strong>{key.replace(/([A-Z])/g, " $1")}:</strong>
                      {Array(val).fill("⭐").join("")}
                      {" - "}{facilityComments[typedKey] || "No comment"}
                    </p>
                  );
                })}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-gray-600">No reviews yet.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-md border transition ${
                page === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
              }`}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-gray-900">
        Submit Your Reviews</h2>

      {!alreadyReviewed ? (
        <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg p-6 shadow-sm bg-white">
          <div>
            <label htmlFor="course" className="block mb-1 font-medium text-gray-700">
              Course Enrolled:
            </label>
            <input
              id="course"
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {Object.entries(ratings).map(([key, value]) => {
                if (key === "facilities") {
                  return Object.entries(value).map(([fKey, fVal]) => (
                    <div key={fKey}>
                      <label className="block font-medium text-gray-700">
                        {fKey.replace(/([A-Z])/g, " $1")}:
                      </label>
                      <StarRating
                        rating={Number(fVal)}
                        onRatingChange={(newRating) =>
                          handleRatingChange(fKey as keyof FacilityRatings, newRating)
                        }
                      />
                    </div>
                  ));
                } else {
                  return (
                    <div key={key}>
                      <label className="block font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </label>
                      <StarRating
                        rating={Number(value)}
                        onRatingChange={(newRating) =>
                          handleRatingChange(key as keyof Ratings, newRating)
                        }
                      />
                    </div>
                  );
                }
              })}
            </div>

          <div className="space-y-6 mt-6">
            {Object.entries(comments).map(([key, value]) => {
              if (key === "facilities") {
                return Object.entries(value).map(([fKey, fVal]) => (
                  <div key={fKey}>
                    <label htmlFor={`comment-${fKey}`} className="block font-medium text-gray-700 capitalize">
                      {fKey.replace(/([A-Z])/g, " $1")} Comment:
                    </label>
                    <textarea
                      id={`comment-${fKey}`}
                      rows={1}
                      value={String(fVal)}
                      onChange={(e) =>
                        handleCommentChange(fKey as keyof FacilityComments, e.target.value)
                      }
                      className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ));
              } else {
                return (
                  <div key={key}>
                    <label htmlFor={`comment-${key}`} className="block font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1")} Comment:
                    </label>
                    <textarea
                      id={`comment-${key}`}
                      rows={2}
                      value={String(value)}
                      onChange={(e) => handleCommentChange(key as keyof Comments, e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              }
            })}

            <div>
              <label htmlFor="internship" className="block font-medium text-gray-700">
                Internship Received?
              </label>
              <select
                id="internship"
                value={internship ? "yes" : "no"}
                onChange={(e) => setInternship(e.target.value === "yes")}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Submit Review
          </button>

          {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
        </form>
      ) : (
        <p className="text-green-600 font-semibold">
          You've already submitted a review for this institution.
        </p>
      )}

      
      </div>
      </div>
  );
};

export default Reviews;
