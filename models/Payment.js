const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  sale_id: { type: mongoose.Schema.Types.ObjectId, ref: "Sale", required: true },
  amount: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now },
  method: { type: String, enum: ["cash", "bank", "transfer"], default: "cash" }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
