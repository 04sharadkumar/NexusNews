const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/profile', protect, getProfile);

router.put('/profile', protect, upload.single('image'), updateProfile);

module.exports = router;
