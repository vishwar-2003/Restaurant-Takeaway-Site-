const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await Customer.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email already in use' });

        const hash = await bcrypt.hash(password, 10);
        const customer = new Customer({ name, email, password: hash });
        await customer.save();
        res.status(201).json({ message: 'Registered successfully' });
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) return res.status(400).json({ error: 'Invalid email' });

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            name: customer.name,
            email: customer.email,
            customerId: customer._id
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Login failed' });
    }
};
