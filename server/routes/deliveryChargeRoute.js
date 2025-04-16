const express = require('express');
const router = express.Router();
const getDeliveryCharges = require('../controllers/DeliveryChargesController');

// Get delivery charges
router.get('/', getDeliveryCharges);

module.exports = router;