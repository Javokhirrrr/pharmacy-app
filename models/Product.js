const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // 📦 Asosiy ma’lumotlar
    name: { type: String, required: true },              // Mahsulot nomi
    barcode: { type: String, unique: true, required: true }, // Unikal shtrix-kod

    // 💰 Narxlar
    price: {
      retail: { type: Number, required: true },     // Chakana narx
      wholesale: { type: Number, required: true },  // Ulgurji narx
      purchase: { type: Number, required: true }    // Kirim narx
    },

    // 📊 Ombordagi miqdor
    quantity: { type: Number, default: 0 },

    // 📅 Amal qilish muddati
    expiry_date: { type: Date, required: true },

    // 🚚 Yetkazib beruvchi
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true
    },

    // 🏭 Ishlab chiqaruvchi
    manufacturer: { type: String, required: true },

    // 💊 Qo‘shimcha atributlar
    type: { type: String }, // Dori shakli (masalan: tabletka, sirop, kapsula, malham)
    size: { type: String }, // O‘lcham (masalan: 100mg, 200ml, 50g)

    // 🏢 Ombor joylashuvi
    location: {
      shelf: { type: String },   // Pol (masalan: 1-pol)
      row: { type: String },     // Qator (masalan: 2-qator)
      position: { type: String } // Joy (masalan: 15-joy)
    },

    // 🔢 Partiya raqami
    batch_number: { type: String, required: true } // Har bir kirim bo‘yicha unikal partiya raqami
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
