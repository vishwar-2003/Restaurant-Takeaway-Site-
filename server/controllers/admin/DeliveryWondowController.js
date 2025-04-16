const DeliveryWindow = require('../../models/DeliveryWindow');

/**
 * Controller to manage admin CRUD operations for Delivery Windows
 */

// GET all delivery windows sorted by date and start time
const getAllWindows = async (req, res) => {
  try {
    const windows = await DeliveryWindow.find().sort({ date: 1, timeFrom: 1 });
    res.json(windows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching delivery windows' });
  }
};

// POST: Create a new delivery window
const createWindow = async (req, res) => {
  try {
    const { date, timeFrom, timeTo, allocatedSlots } = req.body;

    // Create new window and initialize available slots to allocated slots
    const newWindow = new DeliveryWindow({
      date,
      timeFrom,
      timeTo,
      allocatedSlots,
      availableSlots: allocatedSlots // Ensures availability starts full
    });

    const saved = await newWindow.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating delivery window', error: err.message });
  }
};

// PUT: Update existing delivery window
const updateWindow = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, timeFrom, timeTo, allocatedSlots } = req.body;

    // Update with new values; optionally reset available slots
    const updated = await DeliveryWindow.findByIdAndUpdate(
      id,
      {
        date,
        timeFrom,
        timeTo,
        allocatedSlots,
        availableSlots: allocatedSlots
      },
      { new: true } // Return the updated document
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating delivery window', error: err.message });
  }
};

// DELETE: Remove a delivery window by ID
const deleteWindow = async (req, res) => {
  try {
    await DeliveryWindow.findByIdAndDelete(req.params.id);
    res.json({ message: 'Delivery window deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting delivery window', error: err.message });
  }
};

module.exports = {
  getAllWindows,
  createWindow,
  updateWindow,
  deleteWindow
};
