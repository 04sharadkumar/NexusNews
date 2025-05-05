import React, { useState } from 'react';
import Notiflix from "notiflix";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Notiflix
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '8px',
  rtl: false,
  timeout: 3000,
});

// Notification handlers
const notifyToast = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast.info(msg),
  warning: (msg) => toast.warning(msg),
  dark: (msg) => toast.dark(msg),
};

const notifyNotiflix = {
  success: (msg) => Notiflix.Notify.success(msg),
  error: (msg) => Notiflix.Notify.failure(msg),
  info: (msg) => Notiflix.Notify.info(msg),
  warning: (msg) => Notiflix.Notify.warning(msg),
};

function Test() {
  const [counter, setCounter] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCounter = () => {
    setCounter(prev => prev + 1);
    notifyToast.success(`Counter increased to ${counter + 1}`);
  };

  const handleLoginToggle = () => {
    const newStatus = !isLoggedIn;
    setIsLoggedIn(newStatus);
    if (newStatus) {
      notifyNotiflix.success("Login successful! Welcome back.");
    } else {
      notifyNotiflix.warning("You have been logged out.");
    }
  };

  const showPositionedToast = (position) => {
    notifyToast.info(`This toast appears at ${position}`, {
      position: position
    });
  };

  const showPromiseNotification = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => Math.random() > 0.5 ? resolve('Promise resolved!') : reject('Promise rejected!'), 2000);
    });

    toast.promise(
      promise,
      {
        pending: 'Processing your request...',
        success: 'Operation completed successfully!',
        error: 'Operation failed!'
      }
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">🔔 Notification System Demo</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Counter Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Counter with Notifications</h2>
          <div className="flex items-center justify-between">
            <span className="text-lg">Current count: {counter}</span>
            <button
              onClick={handleCounter}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Increment Counter
            </button>
          </div>
        </div>

        {/* Login Status Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Login Status</h2>
          <div className="flex items-center justify-between">
            <span className="text-lg">
              Status: <span className={isLoggedIn ? "text-green-600" : "text-red-600"}>
                {isLoggedIn ? "Logged In" : "Logged Out"}
              </span>
            </span>
            <button
              onClick={handleLoginToggle}
              className={`${isLoggedIn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded transition`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        {/* Toast Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Toast Notifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => notifyToast.success("Success action completed!")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              Success Toast
            </button>
            <button
              onClick={() => notifyToast.error("Something went wrong!")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Error Toast
            </button>
            <button
              onClick={() => notifyToast.info("Here's some information")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Info Toast
            </button>
            <button
              onClick={() => notifyToast.warning("This is a warning message")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition"
            >
              Warning Toast
            </button>
          </div>
        </div>

        {/* Notiflix Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Notiflix Notifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => notifyNotiflix.success("Operation successful!")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
            >
              Success Notification
            </button>
            <button
              onClick={() => notifyNotiflix.error("Failed to complete operation")}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded transition"
            >
              Error Notification
            </button>
            <button
              onClick={() => notifyNotiflix.info("Check this information")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
            >
              Info Notification
            </button>
            <button
              onClick={() => notifyNotiflix.warning("Proceed with caution")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition"
            >
              Warning Notification
            </button>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Advanced Notification Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={showPromiseNotification}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition"
            >
              Promise Notification
            </button>
            <button
              onClick={() => showPositionedToast('top-left')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
            >
              Top-Left Position
            </button>
            <button
              onClick={() => showPositionedToast('bottom-right')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
            >
              Bottom-Right Position
            </button>
            <button
              onClick={() => notifyToast.dark("Dark mode notification")}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded transition"
            >
              Dark Theme Toast
            </button>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Test;