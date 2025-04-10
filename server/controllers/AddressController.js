const Address = require('../models/Address');

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

const addAddress = async (req, res) => {
  try {
    const { userId, street, city, state, postcode, country, label } = req.body;

    const existing = await Address.findOne({ userId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Address already exists. Use update instead.' });
    }

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

const updateAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { street, city, state, postcode, country, label } = req.body;

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

module.exports = {getAddressByUserId, addAddress, updateAddress}
