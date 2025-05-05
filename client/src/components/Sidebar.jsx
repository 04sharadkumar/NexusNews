import { useSidebar } from "../SidebarProvider/SidebarProvider";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaServicestack, FaPhoneAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { toast } from 'react-toastify';
import { useAuth } from "../Auth/AuthContext";

export default function Sidebar() {
  const { open, setOpen } = useSidebar();
  const { logout } = useAuth(); // Access logout method from AuthContext
  const navigate = useNavigate();

  const closeSidebar = () => setOpen(false);

  const handleLogout = () => {
    // Check if user is logged in (token should exist in localStorage)
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in.");
      return; // Exit logout function if no token is found
    }

    logout(); // Call backend logout
    localStorage.removeItem("user"); // Clear user data
    localStorage.removeItem("token"); // Optional: Remove token

    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

    navigate("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-black text-white p-6 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } z-50 border-r border-gray-800`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-500"
        >
          <AiOutlineClose className="text-3xl" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-800 pb-2">
          News Portal
        </h2>

        <ul className="space-y-5 text-lg font-medium max-h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar">
          <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400">
            <FaHome size={20} />
            <Link to="/" onClick={closeSidebar} className="w-full">Home</Link>
          </li>
          

          <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400">
            <FaServicestack size={20} />
            <Link to="/services" onClick={closeSidebar} className="w-full">Services</Link>
          </li>

          <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400">
            <FaInfoCircle size={20} />
            <Link to="/about" onClick={closeSidebar} className="w-full">About</Link>
          </li>

          <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400">
            <FaPhoneAlt size={20} />
            <Link to="/contact" onClick={closeSidebar} className="w-full">Contact</Link>
          </li>

          <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 hover:text-red-400">
            <IoMdLogOut size={24} />
            <button onClick={handleLogout} className="w-full text-left text-red-500 hover:text-white">
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
}
