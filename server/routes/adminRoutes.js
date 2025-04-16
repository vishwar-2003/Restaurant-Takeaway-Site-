// server/routes/adminRoutes.js
const express = require('express');
const { createAdmin, adminLogin } = require('../controllers/AdminController');  // Ensure these are functions
const router = express.Router();

// Route to create an admin (only for first-time setup)
router.post('/createAdmin', createAdmin);  // This should be a function

// Admin login route
router.post('/adminLogin', (req, res, next) => {
    console.log('Login request received:', req.body); // Log the request data here
    next();  // Call next middleware (adminLogin handler)
}, adminLogin);  // This should be a function

module.exports = router;
