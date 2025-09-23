const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");

// 🔹 Barcha yetkazib beruvchilarni olish
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi yetkazib beruvchi qo‘shish
router.post("/", async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta yetkazib beruvchini olish
router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Yetkazib beruvchi topilmadi" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yetkazib beruvchini yangilash
router.put("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supplier) return res.status(404).json({ error: "Yetkazib beruvchi topilmadi" });
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Yetkazib beruvchini o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Yetkazib beruvchi topilmadi" });
    res.json({ message: "Yetkazib beruvchi o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
