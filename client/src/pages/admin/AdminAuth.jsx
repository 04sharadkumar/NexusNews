import axios from "axios";
import { BASE_URL } from '@/lib/config';

export const adminAuth = async (email, password) => {
  const response = await axios.post(
    `${BASE_URL}/api/admin/adminLogin`,
    { email, password },
    { withCredentials: true } // Make sure this is `withCredentials`
  );

  if (!response.data.success) {
    
    throw new Error("Invalid credentials");
  }

  return response.data; // Return the response which contains data like admin info
};
