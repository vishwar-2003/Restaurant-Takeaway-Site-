const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');  // Make sure this is correct

// Route to get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();  // Fetch all customers from the database
        res.json(customers);  // Send the customers as JSON response
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Failed to fetch customers" });
    }
});

module.exports = router;
