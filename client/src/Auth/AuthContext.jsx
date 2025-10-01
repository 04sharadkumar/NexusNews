import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user and token from localStorage on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(storedUser);
      // ✅ Set default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `https://nexus-backend-yqr6.onrender.com/api/auth/login`,
        { email, password },
        { withCredentials: true } // cookies bhi bhejega
      );

      const { user, token } = response.data;

      // ✅ Set user state and store token & user in localStorage
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // ✅ Set default axios header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // ✅ Remove default axios header
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
