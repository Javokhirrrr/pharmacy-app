const mongoose = require("mongoose");

const MedicineTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // Tabletka, Kapsula, Sirop
}, { timestamps: true });

module.exports = mongoose.model("MedicineType", MedicineTypeSchema);
