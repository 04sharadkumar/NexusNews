import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose, onSignup }) => {
  if (!isOpen) return null; // Hide modal if not open

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError(null); // Reset previous errors

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("Login Successful:", data);
      onClose(); // Close modal on successful login

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit} method="POST">
          <div>
            <label className="block mb-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600" 
              required 
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className={`w-full py-2 mt-2 bg-black text-white transition font-semibold rounded 
              ${!username || !password ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
            disabled={!username || !password}
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button 
            onClick={onSignup} 
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-xl hover:text-gray-600"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
