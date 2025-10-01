require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/dbConfig");


const authRoutes = require("./routes/authRoutes");
const contactRoutes = require('./routes/contactRoutes');
const  newsRoutes  = require("./routes/newsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
connectDB();

const allowedOrigins = [
  'https://nexus-frontend-gamma.vercel.app',
  'https://nexus-frontend-git-main-04sharadkumars-projects.vercel.app',
  'https://nexus-frontend-gmh00k4jp-04sharadkumars-proj.vercel.app',
  'http://localhost:5173' // optional for local dev
];
// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true ,limit:"10mb"}));
app.use(cookieParser());



// Routes
app.get("/", (req, res) => res.send("Backend is Running 🚀"));

app.use("/api/auth", authRoutes);

app.use("/api",contactRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/news", newsRoutes);

app.use("/api/profile", profileRoutes);







// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
