// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const mongoDbConnect = require("./dbConn/dbConnection");

// Routes
const authRoute = require('./routes/authRoute');
const reviewRoute = require('./routes/reviewRoute');
const menuRoute = require('./routes/menuRoute');
const ordersRoute = require('./routes/orderRoute'); 
const addressRoute = require('./routes/addressRoute');
const deliveryChargeRoute = require('./routes/deliveryChargeRoute');
const deliveryWindowRoute = require('./routes/deliveryWindowRoute');

const adminRoutes = require('./routes/adminRoutes');   // Admin auth routes (login, create admin)
const adminDashboardRoutes = require('./routes/admin'); // Admin dashboard-related routes (get customers, reviews, etc.)

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoDbConnect();

// Routes
app.get("/", (req, res) => {
  res.status(200).send({ message: "success" });
});
app.use('/api/auth', authRoute);
app.use('/api/review', reviewRoute);
app.use('/api/menu', menuRoute);
app.use('/api/order', ordersRoute);
app.use('/api/address', addressRoute);
app.use('/api/delivery/charges', deliveryChargeRoute);
app.use('/api/delivery/windows', deliveryWindowRoute);

// Admin Authentication Routes
app.use('/api/admin/auth', adminRoutes);  // Admin login, create admin, etc.

// Admin Dashboard Routes (protected by JWT token)
app.use('/api/admin', adminDashboardRoutes);  // Get customers, reviews, etc. (requires auth)

// Other Routes
app.use('/api/customers', require('./routes/customers'));
// app.use('/api/reviews', require('./routes/reviews'));
// app.use('/api/menu', require('./routes/menuRoutes'));

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
