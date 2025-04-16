const Review = require('../models/Review');
const Customer = require('../models/Customer');

exports.createReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const customer = await Customer.findById(req.customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const review = new Review({
            customerId: req.customerId,
            customerName: customer.name,
            rating,
            comment,
        });

        await review.save();
        res.json(review);
    } catch (err) {
        console.error("Review submission error:", err.message);
        res.status(500).json({ message: 'Error submitting review' });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        console.error("Fetch reviews error:", err.message);
        res.status(500).json({ message: 'Failed to load reviews' });
    }
};

exports.getTopReviews = async (req, res) => {
    try {
        const top = await Review.find().sort({ rating: -1 }).limit(5);
        res.json(top);
    } catch (err) {
        console.error("Fetch top reviews error:", err.message);
        res.status(500).json({ message: 'Failed to load top reviews' });
    }
};
