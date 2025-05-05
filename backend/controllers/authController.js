require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// for activity 
const logActivity = require("../utils/logActivity");

// ✅ Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;

    const existing = await User.findOne({ email });

    if (existing) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({ name, email, password, bio });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    
    // ✅ Log the activity here
    await logActivity(newUser._id, "New user registered");

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 🔑 Important: Select password explicitly
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePass(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      image: user.image,
    };

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful and Token saved in cookies",
      user: userData,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  
  console.log(token);  // To check if the token is being received

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use 'decoded' instead of 'decode'
    const user = await User.findById(decoded.userId).select("-password");

    console.log(user);  // To check if the user is being fetched correctly
    

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};





// ✅ Logout
const logoutUser = async (req, res) => {
  // Step 1: Clear the token cookie from the client
  res.clearCookie("token");

  // Step 2: Send a success response
  res.status(200).json({ message: "Logged out successfully and remove the token from cookies" });
};


// ✅ Get Profile


const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      image: user.image,
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};


// ✅ Update Profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, bio } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    const updated = await user.save();
    

  // 📌 Activity Log
  await logActivity(userId, 'User updated profile');

    res.status(200).json({
      message: "Profile updated",
      user: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        bio: updated.bio,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};



module.exports = {
  registerUser,
  loginUser,
  logoutUser,   // <- ye hona chahiye
  updateUserProfile,    // <- ye bhi hona chahiye agar use kar rahe ho
  getCurrentUser 
};


