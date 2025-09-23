const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true }, // klinika nomi
  contact_person: String,
  phone: { type: String, required: true, unique: true },
  email: String,
  total_paid: { type: Number, default: 0 }, // umumiy to‘langan summa
  total_debt: { type: Number, default: 0 }  // qarzdorlik
}, { timestamps: true });

module.exports = mongoose.model("Client", ClientSchema);
