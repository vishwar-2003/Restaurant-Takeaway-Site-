const DeliveryCharges = require('../models/DeliveryCharge');

/**
 * Controller to handle fetching delivery charges for different areas.
 */

// GET: Retrieve all delivery charges from the database
const getDeliveryCharges = async (req, res) => {
  try {
    const charges = await DeliveryCharges.find(); // Fetch all documents from DeliveryCharges collection
    res.status(200).json(charges); // Return charges as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching charges' }); // Handle server/database error
  }
};

module.exports = getDeliveryCharges;