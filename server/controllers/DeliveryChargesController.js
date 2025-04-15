const DeliveryCharges = require('../models/DeliveryCharge');

const getDeliveryCharges = async (req, res) => {
  try {
    const charges = await DeliveryCharges.find();
    res.status(200).json(charges);
} catch (error) {
  res.status(500).json({ message: 'Error fetching charges' });
}
};

module.exports = getDeliveryCharges;