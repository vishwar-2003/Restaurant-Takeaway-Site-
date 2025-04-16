// server/controllers/MenuController.js
const MenuItem = require('../models/MenuItem');  // Ensure this import is correct

// Function to get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();  // Fetch menu items from the database
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Function to insert new menu items
exports.insertMenuItem = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const newItem = await MenuItem.insertMany(data);  // Insert the menu items into the DB
    res.status(200).json(newItem);  // Return the newly added menu item
  } catch (err) {
    res.status(500).send(err);
  }
};
