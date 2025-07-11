import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">Xplorefuture</h3>
          <p className="text-sm">
            Your trusted institution for skills, development, and excellence.
            Empowering future minds with real-world learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/courses" className="hover:underline">Courses</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
          </ul>
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
