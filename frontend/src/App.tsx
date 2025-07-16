import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthProvider";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import OurTeam from "./pages/Ourteam";
import PrivacyPolicy from "./pages/Privacypolicy";
import TermsAndConditions from "./pages/Termsandcondition";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import AddInstitution from "./pages/AddInstitution";
import Explore from "./pages/Explore";
import ProtectedRoute from "./components/ProtectedRoute";
import EditInstitution from "./pages/EditInstitution";
import CourseDetail from "./pages/CourseDetails";
import EntranceExamDetail from "./pages/EntranceExamDetail";
import InstitutionDetailLayout from "./pages/institutionDetail/InstitutionDetailLayout";
import Info from "./pages/institutionDetail/Info";
import Courses from "./pages/institutionDetail/Courses";
import Placement from "./pages/institutionDetail/Placement";
import Facilities from "./pages/institutionDetail/Facilities";
import Reviews from "./pages/institutionDetail/Reviews";
import SearchResults from "./pages/SearchResult";
import AddAdForm from "./pages/AddAdForm";
import AddCourseDetail from "./pages/AddCourseDetails";
import AddEntranceExamDetails from "./pages/AddEntranceExamDetails";
import InstitutionList from "./pages/InstitutionList";
import AllCoursesPage from "./pages/AllCoursesPage";




function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
                    <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/term-and-condition" element={<TermsAndConditions />} />
          <Route path="/courses" element={<AllCoursesPage />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-institution" element={<AddInstitution />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/entrance-exams/:slug" element={<EntranceExamDetail />} />
          <Route path="/institutionlist" element={<InstitutionList />} />



          <Route path="/add-course-detail" element={<AddCourseDetail />} />
          <Route path="/add-entrance-exam-detail" element={<AddEntranceExamDetails />} />

          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:category" element={<Explore />} />
          <Route path="/explore/:category/:state/:city/:entranceExam" element={<Explore />} />

          <Route path="/explore/:state/:city" element={<Explore />} />
          <Route path="/explore/:state" element={<Explore />} />
          <Route path="/explore/:state" element={<Explore />} />
          <Route path="/explore/:state" element={<Explore />} />
          <Route path="/explore/:seoPart" element={<Explore />} />
          <Route path="/add-ad" element={<AddAdForm />} />





          
          <Route path="/:type/:name/edit" element={<EditInstitution />} />
          <Route path="/search/:query" element={<SearchResults />} />



          {/* COLLEGE ROUTES */}
          <Route path="/college/:name" element={<InstitutionDetailLayout />}>
            <Route index element={<Navigate to="info" replace />} />
            <Route path="info" element={<Info />} />
            <Route path="courses" element={<Courses />} />
            <Route path="placement" element={<Placement />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          {/* UNIVERSITY ROUTES */}
          <Route path="/university/:name" element={<InstitutionDetailLayout />}>
            <Route index element={<Navigate to="info" replace />} />
            <Route path="info" element={<Info />} />
            <Route path="courses" element={<Courses />} />
            <Route path="placement" element={<Placement />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer/>

      </Router>
    </AuthProvider>
  );
}

export default App;
