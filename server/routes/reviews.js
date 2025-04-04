const express = require('express');
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');
const Customer = require('../models/Customer'); // <-- Import Customer model
const router = express.Router();

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.customerId = data.id;
        next();
    } catch (err) {
        console.error("JWT error:", err.message);
        res.sendStatus(403);
    }
};

// POST: Create a new review
router.post('/', authenticate, async (req, res) => {
    const { rating, comment } = req.body;

    try {
        // Fetch customer name from DB
        const customer = await Customer.findById(req.customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const review = new Review({
            customerId: req.customerId,
            customerName: customer.name, // Auto-fill name from DB
            rating,
            comment,
        });

        await review.save();
        res.json(review);
    } catch (err) {
        console.error("Review submission error:", err.message);
        res.status(500).json({ message: 'Error submitting review' });
    }
});

// GET: All reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        console.error("Fetch reviews error:", err.message);
        res.status(500).json({ message: 'Failed to load reviews' });
    }
});

// GET: Top reviews by rating
router.get('/top', async (req, res) => {
    try {
        const top = await Review.find().sort({ rating: -1 }).limit(5);
        res.json(top);
    } catch (err) {
        console.error("Fetch top reviews error:", err.message);
        res.status(500).json({ message: 'Failed to load top reviews' });
    }
});

module.exports = router;
