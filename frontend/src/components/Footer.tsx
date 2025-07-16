import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const topCourses = ["BTech", "MBA", "BSc", "BA", "MCA"];
  const categories = ["Engineering", "Management", "Science", "Arts", "Commerce"];
  const exams = ["JEE Main", "NEET", "CAT", "GATE", "CUET"];

  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About & Social */}
        <div>
          <h3 className="text-lg font-bold mb-3">Xplorefuture</h3>
          <p className="text-sm">
            Your trusted institution for skills, development, and excellence.
            Empowering future minds with real-world learning.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400"><FaTwitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram size={20} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Combined: Top Courses, Categories, Exams */}
        <div>
          <h3 className="text-lg font-bold mb-3">Explore</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Top Courses</h4>
              <ul className="space-y-1">
                {topCourses.map((course, i) => (
                  <li key={i}>
                    <Link to={`/course/${encodeURIComponent(course)}`} className="hover:underline">
                      {course}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Categories</h4>
              <ul className="space-y-1">
                {categories.map((cat, i) => (
                  <li key={i}>
                    <Link to={`/explore/${encodeURIComponent(cat)}`} className="hover:underline">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Exams</h4>
              <ul className="space-y-1">
                {exams.map((exam, i) => (
                  <li key={i}>
                    <Link to={`/exam/${encodeURIComponent(exam)}`} className="hover:underline">
                      {exam}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <p className="text-sm">📍 Bhubaneswar, Odisha, India</p>
          <p className="text-sm">📞 +91 7750817880</p>
          <p className="text-sm">✉️ xplorefutureinfo@gmail.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Xplorefuture. All rights reserved.
      </div>
    </footer>
  );
}
