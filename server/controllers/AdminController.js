// server/controllers/AdminController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');

// Create a new admin (only for first-time setup)
exports.createAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin already exists
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
        console.error('Error creating admin:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
// Admin login route
// server/controllers/AdminController.js
// server/controllers/AdminController.js
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username, password);  // Log username and password

    try {
        // Find admin by username
        const admin = await Admin.findOne({ username });
        console.log('Admin found:', admin); // Log if admin is found
        if (!admin) {
            console.log('Admin not found');
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare entered password with hashed password stored in DB
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('Password match:', isMatch); // Log password comparison result

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Create JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
