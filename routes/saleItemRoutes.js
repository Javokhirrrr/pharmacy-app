const express = require("express");
const router = express.Router();
const SaleItem = require("../models/SaleItem");
const Product = require("../models/Product");

// 🔹 Barcha sotuv detallari
router.get("/", async (req, res) => {
  try {
    const items = await SaleItem.find()
      .populate("sale_id", "total_amount sale_date")
      .populate("product_id", "name barcode");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi sotuv detali qo‘shish
router.post("/", async (req, res) => {
  try {
    const { sale_id, product_id, quantity, price } = req.body;

    // Ombordagi qoldiqni kamaytirish
    await Product.findByIdAndUpdate(product_id, { $inc: { quantity: -quantity } });

    const saleItem = new SaleItem({ sale_id, product_id, quantity, price });
    await saleItem.save();

    res.status(201).json(saleItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta detali olish
router.get("/:id", async (req, res) => {
  try {
    const item = await SaleItem.findById(req.params.id)
      .populate("sale_id", "total_amount sale_date")
      .populate("product_id", "name barcode");
    if (!item) return res.status(404).json({ error: "SaleItem topilmadi" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Detalni yangilash
router.put("/:id", async (req, res) => {
  try {
    const item = await SaleItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "SaleItem topilmadi" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Detalni o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const item = await SaleItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "SaleItem topilmadi" });
    res.json({ message: "SaleItem o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
