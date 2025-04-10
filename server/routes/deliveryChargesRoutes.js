const express = require('express');
const router = express.Router();
const getDeliveryCharges = require('../controllers/DeliveryChargesController');

router.get('/api/delivery_charges', getDeliveryCharges);

module.exports = router;