const mongoose = require("mongoose");

const ExpirationTrackingSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  expiry_date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["normal", "warning", "expired"], 
    default: "normal" 
  }
}, { timestamps: true });

module.exports = mongoose.model("ExpirationTracking", ExpirationTrackingSchema);
