import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user and token from localStorage on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);

      // Set default Authorization header for all axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://nexus-backend-yqr6.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true } // for cookie support
      );

      const { user, token } = response.data;

      // Save user & token in localStorage
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Set default axios header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return response;
    } catch (err) {
      console.error("Login error:", err);
      throw new Error("Login failed");
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      // Optional: call backend logout endpoint to clear cookie
      await axios.post(
        "https://nexus-backend-yqr6.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.warn("Logout request failed:", err);
    }

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Remove axios default header
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
