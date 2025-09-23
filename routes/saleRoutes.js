const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

// 🔹 Barcha sotuvlarni olish
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("client_id", "name phone")
      .populate("delivery_id", "type status");
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi sotuv qo‘shish
router.post("/", async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta sotuvni olish
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("client_id", "name phone")
      .populate("delivery_id", "type status");
    if (!sale) return res.status(404).json({ error: "Sotuv topilmadi" });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Sotuvni yangilash
router.put("/:id", async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sale) return res.status(404).json({ error: "Sotuv topilmadi" });
    res.json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Sotuvni o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sotuv topilmadi" });
    res.json({ message: "Sotuv o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
