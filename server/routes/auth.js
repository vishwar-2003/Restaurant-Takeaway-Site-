const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
        const customer = new Customer({ name, email, password: hash });
        await customer.save();
        res.status(201).send("Registered");
    } catch {
        res.status(400).json({ error: "Email already in use" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, name: customer.name });
});

module.exports = router;
