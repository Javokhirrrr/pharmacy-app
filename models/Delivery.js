const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["pickup", "courier", "transport"], 
    required: true 
  },
  delivery_date: { type: Date, default: Date.now },
  status: { type: String, default: "pending" } // pending, shipped, delivered, cancelled
}, { timestamps: true });

module.exports = mongoose.model("Delivery", DeliverySchema);
