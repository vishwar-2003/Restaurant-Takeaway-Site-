const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'failed'],
    default: 'unpaid'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],
    required: true
  },
  deliveryType: {
    type: String,
    enum: ['takeaway', 'delivery'],
    required: true
  },
  deliveryAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: function () {
      return this.deliveryType === 'delivery';
    }
  },  
  orderedAt: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: String, // Format: 'YYYY-MM-DD'
    required: function () {
      return this.deliveryType === 'delivery';
    }
  },
  deliveryWindowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryWindow',
    required: function () {
      return this.deliveryType === 'delivery';
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);
