const User = require('../models/User');

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      bio: req.user.bio,
      image: req.user.image, // ✅ Ye hona chahiye
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {

  console.log("From Frontend → file:", req.file);
console.log("From Frontend → body:", req.body);
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;

    // If file uploaded, update image
    if (req.file && req.file.path) {
      user.image = req.file.path; // Assuming Cloudinary gives the final URL here
    }

    const updatedUser = await user.save();

    

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        image: updatedUser.image,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
