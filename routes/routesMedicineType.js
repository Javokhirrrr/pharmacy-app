const express = require("express");
const router = express.Router();
const MedicineType = require("../models/MedicineType");

// ➕ Qo‘shish
router.post("/", async (req, res) => {
  try {
    const type = new MedicineType(req.body);
    await type.save();
    res.status(201).json(type);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Barcha turlarni olish
router.get("/", async (req, res) => {
  try {
    const types = await MedicineType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Bitta olish
router.get("/:id", async (req, res) => {
  try {
    const type = await MedicineType.findById(req.params.id);
    if (!type) return res.status(404).json({ error: "Topilmadi" });
    res.json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Yangilash
router.put("/:id", async (req, res) => {
  try {
    const type = await MedicineType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!type) return res.status(404).json({ error: "Topilmadi" });
    res.json(type);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ O‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const type = await MedicineType.findByIdAndDelete(req.params.id);
    if (!type) return res.status(404).json({ error: "Topilmadi" });
    res.json({ message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
