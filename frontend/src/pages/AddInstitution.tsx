import React, { useState, useEffect } from "react";
import axios from "axios";
import categoryOptions from "../constants/categories";
import entranceExamList from "../constants/entranceExam";
import states from "../constants/states";
import citiesData from "../constants/cities";
import courseList from "../constants/courses";


const AddInstitution: React.FC = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [owner, setOwner] = useState("");
  const [place, setPlace] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [country, setCountry] = useState("India");
  const [establishedYear, setEstablishedYear] = useState("");
  const [campusArea, setCampusArea] = useState("");
  const [affiliatedTo, setAffiliatedTo] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [famousCourse, setFamousCourse] = useState("");
const [coursesAndFees, setCoursesAndFees] = useState([
  { course: "", duration: "", fees: "", entranceExams: [] as string[] }
]);
  const [courseOptions, setCourseOptions] = useState<{ name: string; duration: string }[]>([]);
  const [placementDetails, setPlacementDetails] = useState({ highest: "", median: "", lowest: "" });
  const [companiesVisited, setCompaniesVisited] = useState<string[]>([]);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [events, setEvents] = useState([{ eventName: "", eventDate: "" }]);
  const [scholarship, setScholarship] = useState("");
  const [gallery, setGallery] = useState<string[]>([""]);
  const [facilities, setFacilities] = useState({
    infrastructure: "Available",
    laboratories: "Available",
    sportsFacilities: "Available",
    hostel: "Available",
    smartClassroom: "Available",
  });
  const [error, setError] = useState("");
  const typeOptions = ["college", "university"];
  const ownerOptions = ["Government", "Private", "Public"];
  const [category, setCategory] = useState("");
  const [rankings, setRankings] = useState([{ agency: "", rank: "", year: "" }]);
  const agencyOptions = ["NIRF", "IIRF", "India Today", "XploreFuture"];



  useEffect(() => {
    setCourseOptions(courseList);
  }, []);

  const validateInputs = () => {
    if (!name || !type || !owner || !place || !city || !state || !establishedYear) {
      setError("All required fields must be filled.");
      return false;
    }
    return true;
  };

  const calculateAverageFee = () => {
    const numericFees = coursesAndFees
      .map((c) => parseFloat(c.fees.replace(/[^\d.]/g, "")))
      .filter((f) => !isNaN(f));
    if (!numericFees.length) return "";
    const average = numericFees.reduce((a, b) => a + b, 0) / numericFees.length;
    if (average >= 100000) return (average / 100000).toFixed(1).replace(/\.0$/, "") + " lakh";
    else if (average >= 1000) return (average / 1000).toFixed(0) + " thousand";
    else return average.toFixed(0);
  };

  const handleAddInstitution = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateInputs()) return;

    const institutionData = {
      name, type, owner,
      location: { place, city, state, country },
      establishedYear: Number(establishedYear),
      campusArea, affiliatedTo, approvedBy,
      averageFee: calculateAverageFee(),
      famousCourse,
      coursesAndFees: coursesAndFees.map((c) => ({
        course: c.course,
        duration: c.duration || "N/A",
        fees: c.fees,
        entranceExam: c.entranceExams
      })),
      placementDetails,
      companiesVisited,
      announcements,
      additionalInfo,
      facilities,
      events: events.filter(e => e.eventName.trim() && e.eventDate).map((e) => ({ title: e.eventName, date: e.eventDate })),
      scholarship,
      gallery: gallery.filter(url => url.trim()).map((url) => ({ imageUrl: url, caption: "" })),
      category,
      rankings: rankings
    .filter(r => r.agency && r.rank && r.year)
    .map(r => ({
      agency: r.agency.trim(),
      rank: Number(r.rank),
      year: Number(r.year)
    })),

    };

    try {
      const response = await axios.post("http://localhost:5000/api", institutionData);
      console.log("Institution added:", response.data);
      alert("Institution added successfully!");
    } catch (error) {
      console.error("Error adding institution:", error);
      setError("Failed to add institution. Please check your inputs.");
    }
  };

  const handleCourseChange = (
  index: number,
  field: "course" | "fees" | "entranceExams",
  value: string | string[]
) => {
  const updated = [...coursesAndFees];

  if (field === "entranceExams") {
    // Ensure entranceExams is always string[]
    updated[index].entranceExams = Array.isArray(value) ? value : [value];
  } else {
    updated[index][field] = value as string;

    if (field === "course") {
      const selected = courseOptions.find(opt => opt.name === value);
      updated[index].duration = selected?.duration || "";
    }
  }

  setCoursesAndFees(updated);
};


  const handleAddCourse = () => setCoursesAndFees([...coursesAndFees, { course: "", duration: "", fees: "" ,entranceExams: [] as string[]}]);
  const handleAnnouncementChange = (index: number, value: string) => {
    const updated = [...announcements];
    updated[index] = value;
    setAnnouncements(updated);
  };
  const handleAddAnnouncement = () => setAnnouncements([...announcements, ""]);
  const handleFacilitiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFacilities((prev) => ({ ...prev, [name]: value }));
  };
  const handleEventChange = (index: number, field: "eventName" | "eventDate", value: string) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  };
  const handleAddEvent = () => setEvents([...events, { eventName: "", eventDate: "" }]);
  const handleGalleryChange = (index: number, value: string) => {
    const updated = [...gallery];
    updated[index] = value;
    setGallery(updated);
  };
  const handleAddGalleryImage = () => setGallery([...gallery, ""]);

  return (
    <div className="max-w-4xl mx-auto p-16 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Add Institution</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleAddInstitution} className="space-y-4">
        <input type="text" placeholder="Institution Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded p-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={type} onChange={(e) => setType(e.target.value)} required className="border rounded p-2">
            <option value="">Select Type</option>
            {typeOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
          </select>

          <select value={owner} onChange={(e) => setOwner(e.target.value)} required className="border rounded p-2">
            <option value="">Select Owner</option>
            {ownerOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
          </select>
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded p-2">
          <option value="">Select Category</option>
          {categoryOptions.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
        </select>


        <input type="text" placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} required className="w-full border rounded p-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={state} onChange={(e) => { setState(e.target.value); setCity(""); setCityOptions(citiesData[e.target.value] || []); }} required className="border rounded p-2">
            <option value="">Select State</option>
            {states.map((s, index) => <option key={index} value={s}>{s}</option>)}
          </select>

          <select value={city} onChange={(e) => setCity(e.target.value)} required className="border rounded p-2">
            <option value="">Select City</option>
            {cityOptions.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>

        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full border rounded p-2" />
        <input type="number" placeholder="Established Year" value={establishedYear} onChange={(e) => setEstablishedYear(e.target.value)} required className="w-full border rounded p-2" />
        <input type="text" placeholder="Campus Area" value={campusArea} onChange={(e) => setCampusArea(e.target.value)} className="w-full border rounded p-2" />
        <input type="text" placeholder="Affiliated To" value={affiliatedTo} onChange={(e) => setAffiliatedTo(e.target.value)} className="w-full border rounded p-2" />
        <input type="text" placeholder="Approved By" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} className="w-full border rounded p-2" />
        <input type="text" placeholder="Famous Course" value={famousCourse} onChange={(e) => setFamousCourse(e.target.value)} className="w-full border rounded p-2" />

       {/* Courses and Fees */}
        <h4 className="text-xl font-semibold">Courses and Fees</h4>
        {coursesAndFees.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={item.course}
              onChange={(e) => handleCourseChange(index, "course", e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Select Course</option>
              {courseOptions.map((course, idx) => {
                const isSelected = coursesAndFees.some((c, i) => c.course === course.name && i !== index);
                return (
                  <option key={idx} value={course.name} disabled={isSelected}>
                    {course.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              value={item.duration || ""}
              placeholder="Duration"
              readOnly
              className="border rounded p-2 bg-gray-100"
            />

            <input
              type="text"
              placeholder="Fees"
              value={item.fees}
              onChange={(e) => handleCourseChange(index, "fees", e.target.value)}
              className="border rounded p-2"
            />

            <select
              multiple
              value={item.entranceExams}
              onChange={(e) =>
                handleCourseChange(
                  index,
                  "entranceExams",
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="border rounded p-2"
            >
              {entranceExamList.map((exam, i) => (
                <option key={i} value={exam.name}>
                  {exam.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="button" onClick={handleAddCourse} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add Course
        </button>
        <input type="text" value={calculateAverageFee()} readOnly className="w-full border rounded p-2 bg-gray-100" placeholder="Average Fee" />

        <h4 className="text-xl font-semibold">Placement Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Highest Package" value={placementDetails.highest || ""} onChange={(e) => setPlacementDetails({ ...placementDetails, highest: e.target.value })} className="border rounded p-2" />
          <input type="text" placeholder="Median Package" value={placementDetails.median || ""} onChange={(e) => setPlacementDetails({ ...placementDetails, median: e.target.value })} className="border rounded p-2" />
          <input type="text" placeholder="Lowest Package" value={placementDetails.lowest || ""} onChange={(e) => setPlacementDetails({ ...placementDetails, lowest: e.target.value })} className="border rounded p-2" />
        </div>

        <input type="text" placeholder="Companies Visited (comma separated)" onChange={(e) => setCompaniesVisited(e.target.value.split(","))} className="w-full border rounded p-2" />

        <h4 className="text-xl font-semibold">Announcements</h4>
        {announcements.map((announcement, index) => (
          <input key={index} type="text" value={announcement || ""} placeholder={`Announcement ${index + 1}`} onChange={(e) => handleAnnouncementChange(index, e.target.value)} className="w-full border rounded p-2" />
        ))}
        <button type="button" onClick={handleAddAnnouncement} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Add Announcement</button>

        <h4 className="text-xl font-semibold">Rankings</h4>
{rankings.map((ranking, index) => (
  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
    <select
  value={ranking.agency}
  onChange={(e) => {
    const updated = [...rankings];
    updated[index].agency = e.target.value;
    setRankings(updated);
  }}
  className="border rounded p-2"
>
  <option value="">Select Agency</option>
  {agencyOptions.map((agency, i) => (
    <option key={i} value={agency}>{agency}</option>
  ))}
</select>

    <input
      type="number"
      placeholder="Rank"
      value={ranking.rank}
      onChange={(e) => {
        const updated = [...rankings];
        updated[index].rank = e.target.value;
        setRankings(updated);
      }}
      className="border rounded p-2"
    />
    <input
      type="number"
      placeholder="Year"
      value={ranking.year}
      onChange={(e) => {
        const updated = [...rankings];
        updated[index].year = e.target.value;
        setRankings(updated);
      }}
      className="border rounded p-2"
    />
  </div>
))}
<button
  type="button"
  onClick={() => setRankings([...rankings, { agency: "", rank: "", year: "" }])}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  + Add Ranking
</button>


        <h4 className="text-xl font-semibold">Additional Info</h4>
        <textarea placeholder="Additional Information" value={additionalInfo || ""} onChange={(e) => setAdditionalInfo(e.target.value)} className="w-full border rounded p-2" />

        <h4 className="text-xl font-semibold">Events</h4>
        {events.map((event, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Event Name" value={event.eventName || ""} onChange={(e) => handleEventChange(index, "eventName", e.target.value)} className="border rounded p-2" />
            <input type="date" value={event.eventDate || ""} onChange={(e) => handleEventChange(index, "eventDate", e.target.value)} className="border rounded p-2" />
          </div>
        ))}
        <button type="button" onClick={handleAddEvent} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Add Event</button>

        <h4 className="text-xl font-semibold">Scholarship</h4>
        <textarea placeholder="Scholarship details" value={scholarship || ""} onChange={(e) => setScholarship(e.target.value)} className="w-full border rounded p-2" />

        <h4 className="text-xl font-semibold">Gallery</h4>
        {gallery.map((img, index) => (
          <input key={index} type="text" placeholder="Image URL" value={img || ""} onChange={(e) => handleGalleryChange(index, e.target.value)} className="w-full border rounded p-2" />
        ))}
        <button type="button" onClick={handleAddGalleryImage} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Add Image</button>

        <h4 className="text-xl font-semibold">Facilities</h4>
        {["infrastructure", "laboratories", "sportsFacilities", "hostel", "smartClassroom"].map((facility) => (
          <div key={facility} className="flex items-center gap-4">
            <label className="w-40 capitalize">{facility}:</label>
            <select name={facility} onChange={handleFacilitiesChange} className="border rounded p-2">
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Institution</button>
      </form>
    </div>
  );
};

export default AddInstitution;
