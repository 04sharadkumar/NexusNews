const express = require("express");
const router = express.Router();


const { registerUser, loginUser, logoutUser,getCurrentUser } = require("../controllers/authController");

const { getProfile, updateProfile } = require("../controllers/profileController");
const  protect  = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// router.get("/profile", protect, getProfile); // Get basic info
// router.put("/profile", protect, upload.single("image"), updateProfile ); // Update profile with image
// router.get("/me",getCurrentUser);

module.exports = router;
