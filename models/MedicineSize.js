const mongoose = require("mongoose");

const MedicineSizeSchema = new mongoose.Schema({
  value: { type: String, required: true, unique: true } // 100mg, 200ml, 500gr
}, { timestamps: true });

module.exports = mongoose.model("MedicineSize", MedicineSizeSchema);
