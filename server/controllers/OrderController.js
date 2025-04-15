const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const MenuItem = require("../models/MenuItem");

const placeOrder = async (req, res) => {
  try {
    const {
      customerId,
      paymentMethod,      // 'cash' or 'card'
      deliveryType,       // 'takeaway' or 'delivery'
      deliveryAddressId,  // optional if takeaway
      totalPrice,
      items               // array of { _id, quantity, price }
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order.' });
    }

    if (deliveryType === 'delivery' && !deliveryAddressId) {
      return res.status(400).json({ success: false, message: 'Delivery address is required for delivery orders.' });
    }

    const paymentStatus = paymentMethod === 'card' ? 'paid' : 'unpaid';

    // Build the order object conditionally
    const orderData = {
      customerId,
      totalPrice,
      paymentMethod,
      paymentStatus,
      deliveryType,
    };

    if (deliveryType === 'delivery') {
      orderData.deliveryAddressId = deliveryAddressId;
    }

    const order = await Order.create(orderData);

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

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ customerId: userId })
      .populate('deliveryAddressId')
      .sort({ orderedAt: -1 });

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.find({ orderId: order._id }).populate('menuItemId');
        return {
          ...order._doc,
          items: items.map(item => ({
            name: item.menuItemId.name,
            quantity: item.quantity,
            price: item.price
          }))
        };
      })
    );

    res.status(200).json({ success: true, data: ordersWithItems });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate('deliveryAddressId')
      .populate('customerId');

    const items = await OrderItem.find({ orderId }).populate('menuItemId');

    res.status(200).json({
      success: true,
      data: {
        ...order._doc,
        items: items.map(item => ({
          name: item.menuItemId.name,
          quantity: item.quantity,
          price: item.price
        }))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
};


module.exports = {getUserOrders, placeOrder, getOrderById};
