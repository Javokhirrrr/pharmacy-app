const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  delivery_id: { type: mongoose.Schema.Types.ObjectId, ref: "Delivery" }, // optional
  sale_date: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true },
  payment_type: { 
    type: String, 
    enum: ["Naqd", "Uscard", "Humo", "Karta", "Qarzga"], 
    default: "Naqd" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Sale", SaleSchema);
