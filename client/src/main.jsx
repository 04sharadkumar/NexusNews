import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // ✅ sirf ek baar import karo
import App from './App.jsx'
// 👇 Add this line here
import axios from "axios";
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
