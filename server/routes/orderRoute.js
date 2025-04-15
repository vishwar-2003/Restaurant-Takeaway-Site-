const express = require('express');
const router = express.Router();
const {placeOrder, getUserOrders, getOrderById} = require('../controllers/OrderController');

router.post('/', placeOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:orderId', getOrderById)

module.exports = router;
