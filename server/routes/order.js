const express = require('express');
const router = express.Router();
const {placeOrder} = require('../controllers/OrderController');

router.post('/', placeOrder);

module.exports = router;
