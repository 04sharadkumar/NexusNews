import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "@/Auth/AuthContext";
import LoginModal from "./LoginModel";
import axios from "axios";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true,
      });

      toast.success("Logout successful!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });

      logout(); // Clears context or state
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const dropdownItems = [
    !user ? { to: "/login", label: "User Login" } : null, // Only show User Login if not logged in
    user && !user.isAdmin ? { to: "/ProfilePage", label: "Profile" } : null, // Show Profile for non-admin users
    user && !user.isAdmin ? { to: "/SettingPage", label: "Settings" } : null, // Show Settings for non-admin users
    !user || user.isAdmin ? { to: "/AdminLogin", label: "Admin Login" } : null, // Show Admin Login for non-logged in or admin users
  ].filter(Boolean); // Remove any null values

  return (
    <div className="relative" ref={dropdownRef}>
      <FaUserCircle
        size={28}
        className="hover:text-blue-400 transition duration-200 cursor-pointer text-white"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      />

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black text-white border border-gray-700 shadow-lg rounded-md z-50">
          {dropdownItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="block px-4 py-2 hover:bg-gray-800 hover:text-blue-400 transition duration-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 text-red-500 hover:bg-gray-800 hover:text-red-300 transition duration-200"
            >
              Logout
            </button>
          )}
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default UserDropdown;
