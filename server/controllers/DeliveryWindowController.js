const DeliveryWindow = require('../models/DeliveryWindow');

/**
 * Controller to fetch delivery windows by date.
 */

// GET: Retrieve all delivery windows for a specific date, sorted by timeFrom
const getDeliveryWindowsByDate = async (req, res) => {
  try {
    const { date } = req.query; // Get date from query parameters

    if (!date) {
      return res.status(400).json({ success: false, message: 'Date is required.' });
    }

    // Find all delivery windows that match the given date and sort by timeFrom
    const windows = await DeliveryWindow.find({ date }).sort({ timeFrom: 1 });

    res.status(200).json({ success: true, windows });
  } catch (error) {
    console.error('Error fetching delivery windows:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getDeliveryWindowsByDate };
