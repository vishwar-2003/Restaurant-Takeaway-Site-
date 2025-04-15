const mongoose = require('mongoose');

const deliveryChargesSchema = new mongoose.Schema({
    area:
    {
        type : String,
        required : true
    },
    delivery_charge :
    {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('DeliveryCharge', deliveryChargesSchema);
