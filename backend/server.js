require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/dbConfig");


const authRoutes = require("./routes/authRoutes");
const contactRoutes = require('./routes/contactRoutes');
const  newsRoutes  = require("./routes/newsRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true ,limit:"10mb"}));
app.use(cookieParser());


// Routes
app.get("/", (req, res) => res.send("Backend is Running 🚀"));

app.use("/api/auth", authRoutes);

app.use("/api",contactRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/news", newsRoutes);









// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
