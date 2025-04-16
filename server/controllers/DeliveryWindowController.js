const DeliveryWindow = require('../models/DeliveryWindow');

const getDeliveryWindowsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: 'Date is required.' });
    }

    const windows = await DeliveryWindow.find({ date }).sort({ timeFrom: 1 });

    res.status(200).json({ success: true, windows });
  } catch (error) {
    console.error('Error fetching delivery windows:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getDeliveryWindowsByDate };
