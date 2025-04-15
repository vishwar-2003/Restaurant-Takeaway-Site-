const express = require('express');
const router = express.Router();
const getDeliveryCharges = require('../controllers/DeliveryChargesController');

router.get('/', getDeliveryCharges);

module.exports = router;