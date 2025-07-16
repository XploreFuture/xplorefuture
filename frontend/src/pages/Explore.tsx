import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import states from "../constants/states";
import categories from "../constants/categories";
import citiesByState from "../constants/cities";
import entranceExam from "../constants/entranceExam";
import parseSeoPath from "../utils/parseSeoPath";
import HorizontalAd from "../components/HorizontalAd";
import courseList from "../constants/courses";
import Rankings from "../components/institutionranking";



interface FilterOptions {
  category?: string;
  state?: string;
  city?: string;
  entranceExam?: string;
  owner?: string;
  page?: number;
  course?: string;
}



interface CollegeData {
  name: string;
  type: string;
  location: { city: string; state: string ; place: string};
  category: string;
  averageFee: string;
  approvedBy: string;
  affiliatedTo: string;
  rankings: Ranking[];
}
interface Ranking {
  agency: string;
  rank: number;
  year: number;
}


const Explore: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getCourseNameFromSlug = (slug: string | undefined) =>
    courseList.find((c) => c.slug === slug)?.name || slug || "";
  

  const parsedParams = useMemo(() => {
    const seoPart = location.pathname.replace("/explore/", "").replaceAll("-", " ");
    return parseSeoPath(seoPart, courseList.map(c => c.slug));
  }, [location.pathname]);
  
  const [filters, setFilters] = useState<FilterOptions>({
    ...parsedParams,
    page: 1,
  });

  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);





  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api", {
          params: filters,
        });
        setColleges(res.data.institutions || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalResults(res.data.totalResults || 0); 
      } catch (err) {
        console.error("Failed to fetch colleges:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  useEffect(() => {
    const path = [
      filters.category,
      filters.state,
      filters.city,
      filters.entranceExam,
      filters.owner,
      filters.course,
    ]
      .filter(Boolean)
      .map((x) => x!.toString().toLowerCase().replaceAll(" ", "-"))
      .join("-");

    const newUrl = `/explore/${path}`;
    if (location.pathname !== newUrl) {
      navigate(newUrl, { replace: true });
    }
  }, [filters, navigate, location.pathname]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters, page: 1 };
      if (
        newFilters.state &&
        prev.city &&
        !citiesByState[newFilters.state]?.includes(prev.city)
      ) {
        updated.city = "";
      }
      return updated;
    });
  };

  const changePage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const removeFilter = (key: keyof FilterOptions) => {
    setFilters((prev) => ({ ...prev, [key]: "", page: 1 }));
  };
  

  const handleCardClick = (college: CollegeData) => {
    navigate(`/${college.type.toLowerCase()}/${encodeURIComponent(college.name)}`);
  };

  const generateHeading = useCallback(() => {
     const parts: string[] = ["List of"];
    if (filters.owner) parts.push(`${filters.owner}`);
    if (filters.course) parts.push(`${getCourseNameFromSlug(filters.course)} colleges`);
    else if (filters.category) parts.push(`${filters.category} colleges`);
    else parts.push("colleges");

    if (filters.city) parts.push(`in ${filters.city}`);
    else if (filters.state) parts.push(`in ${filters.state}`);
    else parts.push("in India");

    if (filters.entranceExam) parts.push(`accepting ${filters.entranceExam}`);
    return parts.join(" ");
  }, [filters]);

  const generateDescription = useCallback(() => {
    const parts: string[] = ["Explore"];
    if (filters.owner) parts.push(filters.owner.toLowerCase());
    if (filters.course) parts.push(getCourseNameFromSlug(filters.course).toLowerCase());
    else if (filters.category) parts.push(filters.category.toLowerCase());
    parts.push("colleges");

    if (filters.city) parts.push(`in ${filters.city}`);
    else if (filters.state) parts.push(`in ${filters.state}`);

    if (filters.entranceExam) parts.push(`accepting ${filters.entranceExam}`);
    return parts.join(" ") + ".";
  }, [filters]);

  useEffect(() => {
    const heading = generateHeading();
    const description = generateDescription();

    document.title = heading;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, [generateHeading, generateDescription]);

  return (
    <div className="pt-2 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">

<h2 className="text-xl font-semibold mb-4">{generateHeading()}</h2>

      
      {/* Horizontal Scrollable Filter Bar */}
      <div className="sticky top-20 z-30 bg-white shadow-sm px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="flex flex-nowrap gap-4 min-w-max">

          {/* 🔖 Filter Tag */}
          <span className="font-semibold text-gray-700 whitespace-nowrap self-center">Filters:</span>

           {/* Category */}
           <div className="min-w-[70px] max-w-[80px] rounded-xs">
           <select
        value={filters.category || ""}
        onChange={(e) => updateFilters({ category: e.target.value })}
        className="text-xs w-full p-1 border rounded"
      >
        <option value="">Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

        {/* Course */}
        <div className="min-w-[70px] max-w-[80px] rounded-xs">
        <select
        value={filters.course || ""}
        onChange={(e) => updateFilters({ course: e.target.value })}
        className="text-xs w-full p-1 border rounded"
      >
        <option value="">Course</option>
        {courseList.map((course) => (
          <option key={course.slug} value={course.slug}>{course.name}</option>
        ))}
      </select>
    </div>

          {/* State */}
          <div className="min-w-[70px] max-w-[80px] rounded-xs">
      <select
        value={filters.state || ""}
        onChange={(e) => updateFilters({ state: e.target.value })}
        className="text-xs w-full p-1 border rounded"
      >
        <option value="">State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
    </div>

          {/* City */}
          <div className="min-w-[70px] max-w-[80px] rounded-xs">
          <select
        value={filters.city || ""}
        onChange={(e) => updateFilters({ city: e.target.value })}
        className="text-xs w-full p-1 border rounded"
        disabled={!filters.state}
      >
        <option value="">City</option>
        {filters.state &&
          citiesByState[filters.state]?.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
      </select>
    </div>
           {/* Exam */}
           <div className="min-w-[70px] max-w-[80px] rounded-xs">
           <select
        value={filters.entranceExam || ""}
        onChange={(e) => updateFilters({ entranceExam: e.target.value })}
        className="text-xs w-full p-1 border rounded"
      >
        <option value="">Exam</option>
{entranceExam.map((exam) => (
  <option key={exam.name} value={exam.name}>
    {exam.name}
  </option>
))}
      </select>
    </div>

          {/* Owner */}
          <div className="min-w-[70px] max-w-[80px]">
      <select
        value={filters.owner || ""}
        onChange={(e) => updateFilters({ owner: e.target.value })}
        className="text-xs w-full p-1 border rounded"
      >
        <option value="">Ownership</option>
        <option value="Private">Private</option>
        <option value="Government">Government</option>
      </select>
    </div>
  </div>
      </div>
      {/* 🏷️ Active Filter Tags */}
{Object.entries(filters)
  .filter(([key, val]) => val && key !== "page") // ignore empty & page
  .map(([key, val]) => (
    <span
      key={key}
      className="inline-flex items-center text-xs text-red-800 px-0 py-0 border rounded mr-2 mb-2"
    >
      {key.charAt(0).toUpperCase() + key.slice(1)}: {getCourseNameFromSlug(val as string) || val}
      <button
        onClick={() => removeFilter(key as keyof FilterOptions)}
        className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
        aria-label="Remove filter"
      >
        ✕
      </button>
    </span>
))}

<p className="text-sm text-gray-600 mb-4">{totalResults} results found.</p>

      {/* College Results */}
      <div className="mt-10">
        {/* {detected && (
          <div className="mb-4 p-3 bg-gray-100 border rounded">
            <p className="text-sm text-gray-700">
              Showing results for{" "}
              {[detected.category, detected.state, detected.city, detected.entranceExam, detected.owner]
                .filter(Boolean)
                .join(", ")}
            </p>
            <p className="text-xs text-gray-500">
              Search original: {location.pathname.replace("/explore/", "").replaceAll("-", " ")}
            </p>
          </div>
        )} */}

        {loading ? (
          <p>Loading...</p>
        ) : colleges.length ? (
          <>
            <HorizontalAd position="content" />
            <div className="flex flex-col gap-4">
              {colleges.map((college, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCardClick(college)}
                  className="p-6 border rounded bg-white shadow hover:shadow-md cursor-pointer transition duration-200"
                >
                  <h3 className="text-xl font-semibold text-blue-700">{college.name}, {college.location.place}</h3>
                  <p className="text-gray-700">{college.location.city}, {college.location.state}</p>
                  <div className="text-sm text-gray-600 mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-1">
                    <p><strong>Category:</strong> {college.category}</p>
                    <p><strong>Avg Fees:</strong> {college.averageFee}</p>
                    <p><strong>Approved By:</strong> {college.approvedBy}</p>
                    <p><strong>Affiliated To:</strong> {college.affiliatedTo}</p>
                    <Rankings rankings={college.rankings} />


                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => changePage(i + 1)}
                    className={`px-3 py-1 rounded border ${filters.page === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-600"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>No colleges found.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;

