const mongoose = require("mongoose");

const DebtSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }, // FK → Clients
  amount: { type: Number, required: true },
  due_date: { type: Date, required: true },
  status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" }
}, { timestamps: true });

module.exports = mongoose.model("Debt", DebtSchema);
