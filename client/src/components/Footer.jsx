import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
    } else {
      toast.success("Subscribed successfully!");
      setEmail(""); // Optional: Clear input after subscribing
    }
  };

  return (
    <footer className="w-full bg-zinc-900 text-white py-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* 🌍 Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-6">
              <Link to="#" className="hover:text-blue-500 transition duration-300"><FaFacebook size={26} /></Link>
              <Link to="#" className="hover:text-blue-500 transition duration-300"><FaTwitter size={26} /></Link>
              <Link to="#" className="hover:text-pink-500 transition duration-300"><FaInstagram size={26} /></Link>
              <Link to="#" className="hover:text-red-500 transition duration-300"><FaYoutube size={26} /></Link>
            </div>
          </div>

          {/* 📌 Quick Links */}
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-blue-500 transition duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 transition duration-300">About</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition duration-300">Services</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* 📩 Newsletter Subscription */}
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h2>
            <div className="flex flex-col items-center md:items-start">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 text-white rounded-md w-full max-w-xs border border-gray-300 focus:ring-2 focus:ring-amber-500 bg-transparent"
              />
              <button 
                onClick={handleSubscribe}
                className="mt-3 px-6 py-2 bg-amber-500 text-black rounded-md hover:bg-amber-600 transition duration-300 shadow-lg"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* 🔽 Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            © 2025 <span className="text-amber-500">Sharad India, Inc.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
