// models/DeliveryWindow.js
const mongoose = require('mongoose');

const deliveryWindowSchema = new mongoose.Schema({
  date: {
    type: String, // e.g., '2025-04-17'
    required: true
  },
  timeFrom: {
    type: String, // '14:00'
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/
  },
  timeTo: {
    type: String, // '16:00'
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/
  },
  allocatedSlots: {
    type: Number,
    required: true
  },
  availableSlots: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('DeliveryWindow', deliveryWindowSchema);
