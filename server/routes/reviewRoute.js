const express = require('express');
const router = express.Router();
const { createReview, getAllReviews, getTopReviews } = require('../controllers/ReviewController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, createReview);
router.get('/', getAllReviews);
router.get('/top', getTopReviews);

module.exports = router;
