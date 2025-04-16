const express = require('express');
const router = express.Router();
const {placeOrder, getUserOrders, getOrderById} = require('../controllers/OrderController');

//Place an Order
router.post('/', placeOrder);

//Get orders by userID
router.get('/user/:userId', getUserOrders);

//Get Order details by OrderID
router.get('/:orderId', getOrderById)

module.exports = router;
