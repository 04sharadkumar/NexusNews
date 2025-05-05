import { Outlet, Link } from 'react-router-dom';
import {
  FiHome, FiBarChart2, FiPlusCircle, FiFileText,
  FiUsers, FiSettings, FiMenu, FiX
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLayout = () => {
  const [admin, setAdmin] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/adminData');
      setAdmin(response.data.admin.username);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    fetchAdminData();
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when resizing to larger screens
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Sidebar content component to avoid duplication
  const SidebarContent = () => (
    <>
      <h2 className="text-2xl font-bold mb-8 flex items-center">
        <FiHome className="mr-2" /> Admin Panel
      </h2>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/admin/dashboard" 
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => windowWidth < 768 && setIsMobileMenuOpen(false)}
            >
              <FiBarChart2 className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/addNews" 
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => windowWidth < 768 && setIsMobileMenuOpen(false)}
            >
              <FiPlusCircle className="mr-3" /> Add News
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/viewArticles" 
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => windowWidth < 768 && setIsMobileMenuOpen(false)}
            >
              <FiFileText className="mr-3" /> View Articles
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/manageUsers" 
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => windowWidth < 768 && setIsMobileMenuOpen(false)}
            >
              <FiUsers className="mr-3" /> Manage Users
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/settings" 
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => windowWidth < 768 && setIsMobileMenuOpen(false)}
            >
              <FiSettings className="mr-3" /> Settings
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-blue-600">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
            <span className="text-white font-medium">AD</span>
          </div>
          <div>
            <p className="font-medium">{admin}</p>
            <p className="text-xs text-blue-200">Super Admin</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-black to-blue-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <FiHome className="mr-2" /> Admin Panel
        </h2>
        <button 
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar - Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="w-64 h-full bg-gradient-to-b from-black to-blue-800 text-white p-6 flex flex-col">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 bg-gradient-to-b from-black to-blue-800 text-white p-6 flex-col">
        <SidebarContent />
      </div>

      {/* Right side content area */}
      <div className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto">
        <Outlet /> {/* This is where nested route content will be rendered */}
      </div>
    </div>
  );
};

export default AdminLayout;