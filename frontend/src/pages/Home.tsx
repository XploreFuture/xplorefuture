import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CoursesCatalogue from "../components/CourseCatalouge";
import CategoryCatalogue from "../components/CategoryCatalouge";
import LocationCatalogue from "../components/LocationCatalouge";
import EntranceExamCatalogue from "../components/EntranceExamCatalogue";
import TopRankedColleges from "../components/TopRankedColleges"; 



export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore/${searchTerm.trim().replaceAll(" ", "-").toLowerCase()}`);
    }
  };

  return (
    <div>
      {/* 🔁 Image Carousel Section */}
      <div className="relative w-full h-[50vh]">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          interval={2000}
          className="h-full"
        >
          <div>
            <img src="/images/iitbbsr.png" alt="Hero 1" className="object-cover h-[50vh] w-full" />
          </div>
          <div>
            <img src="/images/soa.png" alt="Hero 2" className="object-cover h-[50vh] w-full" />
          </div>
        </Carousel>

        {/* 🔍 Search Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to XploreFuture
            </h1>
            <p className="text-lg md:text-xl text-white mb-6 drop-shadow-md">
              Discover colleges, courses, and careers that match your future.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for colleges, courses, exams..."
                className="flex-grow px-4 py-3 text-gray-700 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 🔽 Courses Catalogue Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Explore Courses</h2>
          <CoursesCatalogue />
        </section>
      </div>
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

       <section>
        <h1 className="text-2xl font-bold mb-4">Browse by Category</h1>
        <CategoryCatalogue />
        </section>
      </div>
                  <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

      <section>
        <h1 className="text-2xl font-bold mb-4">Browse by Location</h1>
        <LocationCatalogue />
      </section>
      </div>
                        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
<section>
  <h1 className="text-2xl font-bold mb-4">Explore Entrance Exams</h1>
  <EntranceExamCatalogue />
        </section>
      </div>
                              <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

       <section>
          <h1 className="text-2xl font-bold mb-4">Top Ranked Colleges</h1>
          <TopRankedColleges /> {/* ✅ Added here */}
        </section>
      </div>
    </div>
  );
}
