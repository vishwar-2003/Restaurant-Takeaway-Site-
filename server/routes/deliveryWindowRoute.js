const express = require('express');
const router = express.Router();
const { getDeliveryWindowsByDate } = require('../controllers/DeliveryWindowController');

router.get('/', getDeliveryWindowsByDate); // GET /api/delivery/windows?date=YYYY-MM-DD

module.exports = router;
