const express = require("express");
const router = express.Router();
const StockMovement = require("../models/StockMovement");
const Product = require("../models/Product");

// 🔹 Barcha ombor harakatlarini olish
router.get("/", async (req, res) => {
  try {
    const stocks = await StockMovement.find()
      .populate("product_id", "name barcode quantity");
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi harakat qo‘shish
router.post("/", async (req, res) => {
  try {
    const { product_id, type, quantity, note } = req.body;

    // 🔹 Ombor qoldig‘ini yangilash
    if (type === "in") {
      await Product.findByIdAndUpdate(product_id, { $inc: { quantity: quantity } });
    } else if (type === "out") {
      await Product.findByIdAndUpdate(product_id, { $inc: { quantity: -quantity } });
    }

    const stockMovement = new StockMovement({ product_id, type, quantity, note });
    await stockMovement.save();

    res.status(201).json(stockMovement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta harakatni olish
router.get("/:id", async (req, res) => {
  try {
    const stock = await StockMovement.findById(req.params.id).populate("product_id", "name barcode");
    if (!stock) return res.status(404).json({ error: "Ombor harakati topilmadi" });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Harakatni o‘chirish (faqat tarix uchun, qoldiq o‘zgarmaydi)
router.delete("/:id", async (req, res) => {
  try {
    const stock = await StockMovement.findByIdAndDelete(req.params.id);
    if (!stock) return res.status(404).json({ error: "Ombor harakati topilmadi" });
    res.json({ message: "Ombor harakati o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
