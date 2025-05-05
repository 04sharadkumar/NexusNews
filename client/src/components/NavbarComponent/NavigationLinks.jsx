import React from "react";
import { Link } from "react-router-dom";

const NavigationLinks = () => {
  return (
    <div className="hidden md:flex space-x-6">
      <ul className="flex space-x-6 text-base font-medium">
        <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
        <li><Link to="/services" className="hover:text-blue-400">Services</Link></li>
        <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
        <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
      </ul>
    </div>
  );
};

export default NavigationLinks;
