const express = require('express');
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');
const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.customerId = data.id;
        next();
    } catch {
        res.sendStatus(403);
    }
};

router.post('/', authenticate, async (req, res) => {
    const { rating, comment, customerName } = req.body;
    const review = new Review({ customerId: req.customerId, customerName, rating, comment });
    await review.save();
    res.json(review);
});

router.get('/', async (req, res) => {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
});

router.get('/top', async (req, res) => {
    const top = await Review.find().sort({ rating: -1 }).limit(5);
    res.json(top);
});

module.exports = router;
