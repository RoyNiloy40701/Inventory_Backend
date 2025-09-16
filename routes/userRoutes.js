const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, getCompanyProfile } = require("../controllers/userController.js");
const { protect } = require('../middlewares/authMiddleware.js');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected route
router.post('/profile', protect, getCompanyProfile);
router.get('/profile', protect, getUserProfile);


module.exports = router;
