const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Review = require('../models/Review');
const MenuItem = require('../models/MenuItem'); // Import the MenuItem model
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// Route to get all customers
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find(); // Fetch all customers from the database
        res.json(customers); // Send the customers as JSON response
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Failed to fetch customers" });
    }
});

// Route to get customers with order count and total spent
router.get('/customers-with-stats', async (req, res) => {
    try {
        const customers = await Customer.find(); // Fetch all customers

        const customersWithStats = [];

        // Loop through each customer to calculate their stats
        for (let customer of customers) {
            const orders = await Order.find({ customerId: customer._id }); // Fetch all orders for this customer
            const orderCount = orders.length; // Get the count of orders for this customer

            // Calculate total spent by summing up all orders' totalPrice
            const totalSpent = orders.reduce((acc, order) => acc + order.totalPrice, 0);

            // Add the customer with their stats
            customersWithStats.push({
                ...customer.toObject(),
                orders: orderCount,
                totalSpent: totalSpent
            });
        }

        res.json(customersWithStats); // Send back the customers with order stats
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch customer data with stats' });
    }
});

// Route to get all reviews (admin page)
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });  // Fetch reviews from DB
        res.json(reviews);  // Send reviews as JSON response
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

// Route to get all menu items
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();  // Fetch all menu items from the database
        res.json(menuItems);  // Send menu items as JSON response
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ error: "Failed to fetch menu items" });
    }
});

// Route to update a menu item (for editing)
router.put('/menu/:id', async (req, res) => {
    const { name, price, category, description } = req.body;
    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            { name, price, category, description },
            { new: true } // Return the updated document
        );
        res.json(updatedMenuItem);  // Send the updated menu item back
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ error: "Failed to update menu item" });
    }
});

// DELETE: Delete a menu item
router.delete('/menu/:id', async (req, res) => {
    try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ error: "Failed to delete menu item" });
    }
});

// POST: Add a new menu item
router.post('/menu', async (req, res) => {
    const { name, price, category, description } = req.body;
    try {
        const newMenuItem = new MenuItem({ name, price, category, description });
        await newMenuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ error: "Failed to add menu item" });
    }
});
// admin.js route for calculating stats
router.get('/orders/stats', async (req, res) => {
    try {
        // Fetch all orders
        const orders = await Order.find();

        // Calculate total orders
        const totalOrders = orders.length;

        // Calculate total revenue
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        // Calculate average order value
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Send the stats as JSON response
        res.json({ totalOrders, totalRevenue, averageOrderValue });
    } catch (err) {
        console.error("Error fetching order stats:", err);
        res.status(500).json({ message: 'Failed to fetch order stats' });
    }
});

// Route to get total customer count
router.get('/customers/count', async (req, res) => {
    try {
        const count = await Customer.countDocuments();
        res.json({ totalCustomers: count });
    } catch (error) {
        console.error("Error fetching customer count:", error);
        res.status(500).json({ error: "Failed to fetch customer count" });
    }
});

// Route to get all orders for the admin
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId', 'name email')  // Populating the customerId field to get customer details
            .sort({ orderedAt: -1 });  // Sorting orders by the most recent first
        res.json(orders);  // Send orders as JSON response
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Route to update the status of an order
router.put('/orders/:id/status', async (req, res) => {
    const { status } = req.body;  // Get the new status from the request body

    try {
        // Find the order by ID and update its status
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // Return the updated order
        );

        // Check if the order was found and updated
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);  // Send the updated order back
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
});

module.exports = router;
