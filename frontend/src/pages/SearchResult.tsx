import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parseSeoPath from "../utils/parseSeoPath";
import defaultCourses from "../constants/courses";

export interface ParsedFilters {
  category?: string;
  course?: string;
  entranceExam?: string;
  state?: string;
  city?: string;
  owner?: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q")?.trim() || "";

    if (!q) {
      navigate("/explore", { replace: true });
      return;
    }

const filters: ParsedFilters = parseSeoPath(q, defaultCourses.map(c => c.slug));

    const seen = new Set<string>();
    const pathParts: string[] = [];

    const pushPart = (val?: string) => {
      if (val) {
        const formatted = val.toLowerCase().replace(/\s+/g, "-");
        if (!seen.has(formatted)) {
          seen.add(formatted);
          pathParts.push(formatted);
        }
      }
    };

    pushPart(filters.category);
    pushPart(filters.state);
    pushPart(filters.city);
    pushPart(filters.entranceExam);
    pushPart(filters.owner);
    pushPart(filters.course);

    const finalPath = pathParts.length > 0 ? `/explore/${pathParts.join("-")}` : "/explore";

    if (location.pathname !== finalPath) {
      navigate(finalPath, { replace: true });
    }
  }, [location, navigate]);

  return <p>Searching...</p>;
};

export default SearchResults;
