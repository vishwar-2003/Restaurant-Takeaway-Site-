const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const MenuItem = require("../models/MenuItem");
const DeliveryWindow = require("../models/DeliveryWindow"); 

// Controller function to place a new order
const placeOrder = async (req, res) => {
  try {
    const {
      customerId,
      paymentMethod,      // 'cash' or 'card'
      deliveryType,       // 'takeaway' or 'delivery'
      deliveryAddressId,  // optional if takeaway
      totalPrice,
      deliveryDate,
      deliveryWindowId,
      items               // array of { _id, quantity, price }
    } = req.body;

    // Check if order contains items
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order.' });
    }

    // Delivery-specific validations
    if (deliveryType === 'delivery') {
      if (!deliveryAddressId) {
        return res.status(400).json({ success: false, message: 'Delivery address is required for delivery orders.' });
      }
      if (!deliveryDate || !deliveryWindowId) {
        return res.status(400).json({ success: false, message: 'Delivery date and slot are required for delivery orders.' });
      }

      // Fetch and validate the delivery window
      const deliveryWindow = await DeliveryWindow.findById(deliveryWindowId);
      if (!deliveryWindow || deliveryWindow.date !== deliveryDate) {
        return res.status(400).json({ success: false, message: 'Invalid delivery slot.' });
      }

      if (deliveryWindow.availableSlots <= 0) {
        return res.status(400).json({ success: false, message: 'Selected delivery slot is full.' });
      }

      // Decrement available slot
      deliveryWindow.availableSlots -= 1;
      await deliveryWindow.save();
    }

    // Set payment status based on method
    const paymentStatus = paymentMethod === 'card' ? 'paid' : 'unpaid';

    // Build the order document
    const orderData = {
      customerId,
      totalPrice,
      paymentMethod,
      paymentStatus,
      deliveryType,
    };

    // Add delivery-related fields if delivery order
    if (deliveryType === 'delivery') {
      orderData.deliveryAddressId = deliveryAddressId;
      orderData.deliveryDate = deliveryDate;
      orderData.deliveryWindowId = deliveryWindowId;
    }

    // Save the order
    const order = await Order.create(orderData);

    // Save individual order items
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

// Controller function to get all orders for a user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch orders with delivery details and sort by date
    const orders = await Order.find({ customerId: userId })
      .populate('deliveryAddressId')
      .populate('deliveryWindowId')
      .sort({ orderedAt: -1 });

    // Add items to each order
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

// Controller function to get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch the order with all relevant details
    const order = await Order.findById(orderId)
      .populate('deliveryAddressId')
      .populate('deliveryWindowId')
      .populate('customerId');

    // Fetch items belonging to the order
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

module.exports = { getUserOrders, placeOrder, getOrderById };
