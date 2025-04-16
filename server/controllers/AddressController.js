const Address = require('../models/Address');

/**
 * Controller for managing delivery addresses associated with users.
 */

// GET: Retrieve address for a specific user by userId
const getAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const address = await Address.findOne({ userId });
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// POST: Add a new address for a user
const addAddress = async (req, res) => {
  try {
    const { userId, street, city, state, postcode, country, label } = req.body;

    // Check if an address already exists for the user
    const existing = await Address.findOne({ userId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Address already exists. Use update instead.' });
    }

    // Create and save the new address
    const newAddress = new Address({
      userId,
      street,
      city,
      state,
      postcode,
      country,
      label
    });

    await newAddress.save();
    res.status(201).json({ success: true, data: newAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// PUT: Update an existing address for a user
const updateAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { street, city, state, postcode, country, label } = req.body;

    // Find and update the address, returning the new updated version
    const updated = await Address.findOneAndUpdate(
      { userId },
      { street, city, state, postcode, country, label },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Address not found to update' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = { getAddressByUserId, addAddress, updateAddress };
