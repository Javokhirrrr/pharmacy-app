const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Firma nomi
  contact_person: String,                       // Mas’ul shaxs
  phone: { type: String, required: true },      // Telefon raqami
  email: String,                                // Email
  address: String                               // Manzil
}, { timestamps: true });

module.exports = mongoose.model("Supplier", SupplierSchema);
