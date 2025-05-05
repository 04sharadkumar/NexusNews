// components/SocialLinks.js
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="mt-16 text-center">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h3>
      <div className="flex justify-center space-x-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={24} className="text-blue-600 hover:text-blue-800" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} className="text-blue-400 hover:text-blue-600" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} className="text-pink-600 hover:text-pink-800" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} className="text-blue-700 hover:text-blue-900" />
        </a>
      </div>
    </div>
  );
}
