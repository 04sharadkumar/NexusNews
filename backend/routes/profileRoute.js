const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');
const {getCurrentUser} = require('../controllers/authController')

router.get('/',protect ,getCurrentUser);

router.put('/profile/edit',protect ,upload.single('image'), updateProfile);

module.exports = router;
