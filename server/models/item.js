const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
    {
      itemName: {
        type: String,
        required: [true, "item name is required"]
      },
      price: {
        type : Number,
        required: [true, "price is required"]
      }
    }
  );

module.exports = mongoose.model("Item", itemSchema);;