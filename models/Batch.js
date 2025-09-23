const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  batch_number: { type: String, required: true, unique: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  expiry_date: { type: Date, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Batch", BatchSchema);
