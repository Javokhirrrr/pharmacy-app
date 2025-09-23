const mongoose = require("mongoose");

const StockMovementSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true, // tezroq query qilish uchun
    },
    type: {
      type: String,
      enum: ["in", "out"], // kirim yoki chiqim
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Miqdor 0 dan kichik bo'lishi mumkin emas"],
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockMovement", StockMovementSchema);
