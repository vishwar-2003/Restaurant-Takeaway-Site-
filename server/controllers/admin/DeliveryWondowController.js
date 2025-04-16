const DeliveryWindow = require('../../models/DeliveryWindow');

// GET all delivery windows
const getAllWindows = async (req, res) => {
  try {
    const windows = await DeliveryWindow.find().sort({ date: 1, timeFrom: 1 });
    res.json(windows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching delivery windows' });
  }
};

// POST create a new delivery window
const createWindow = async (req, res) => {
  try {
    const { date, timeFrom, timeTo, allocatedSlots } = req.body;

    const newWindow = new DeliveryWindow({
      date,
      timeFrom,
      timeTo,
      allocatedSlots,
      availableSlots: allocatedSlots // initialize available = allocated
    });

    const saved = await newWindow.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating delivery window', error: err.message });
  }
};

// PUT update an existing delivery window
const updateWindow = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, timeFrom, timeTo, allocatedSlots } = req.body;

    const updated = await DeliveryWindow.findByIdAndUpdate(
      id,
      {
        date,
        timeFrom,
        timeTo,
        allocatedSlots,
        availableSlots: allocatedSlots // optionally reset on update
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating delivery window', error: err.message });
  }
};

// DELETE a delivery window
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
