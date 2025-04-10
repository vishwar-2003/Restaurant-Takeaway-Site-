const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.placeOrder = async (req, res) => {
  try {
    const {
      customerId,
      paymentMethod,      // 'cash' or 'card'
      deliveryType,       // 'takeaway' or 'delivery'
      deliveryAddressId,  // required always
      totalPrice,
      items               // array of { _id, quantity, price }
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order.' });
    }

    // Determine payment status based on method
    const paymentStatus = paymentMethod === 'card' ? 'paid' : 'unpaid';

    // Create Order
    const order = await Order.create({
      customerId,
      totalPrice,
      paymentMethod,
      paymentStatus,
      deliveryType,
      deliveryAddressId
    });

    // Create Order Items
    const orderItems = items.map(item => ({
      orderId: order._id,
      menuItemId: item._id,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderItem.insertMany(orderItems);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: order._id
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Server error. Try again later.' });
  }
};
