const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const mongoDbConnect = require("./dbConn/mongoDbConn");

// Routes
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');
const menuRoutes = require('./routes/menuRoutes');
const ordersRoutes = require('./routes/order'); 
const addressRoutes = require('./routes/addressRoutes');
const deliveryChargesRoutes = require('./routes/deliveryChargesRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoDbConnect();

// Routes
app.get("/", (req, res) => {
  res.status(200).send({ message: "success" });
});

app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.get('/api/menu/items', menuRoutes);
app.post('/api/menu/items', menuRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/address', addressRoutes);
app.get('/api/delivery_charges', deliveryChargesRoutes);



// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
