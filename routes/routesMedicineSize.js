const express = require("express");
const router = express.Router();
const MedicineSize = require("../models/MedicineSize");

// ➕ Qo‘shish
router.post("/", async (req, res) => {
  try {
    const size = new MedicineSize(req.body);
    await size.save();
    res.status(201).json(size);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Barcha o‘lchamlarni olish
router.get("/", async (req, res) => {
  try {
    const sizes = await MedicineSize.find();
    res.json(sizes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Bitta olish
router.get("/:id", async (req, res) => {
  try {
    const size = await MedicineSize.findById(req.params.id);
    if (!size) return res.status(404).json({ error: "Topilmadi" });
    res.json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Yangilash
router.put("/:id", async (req, res) => {
  try {
    const size = await MedicineSize.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!size) return res.status(404).json({ error: "Topilmadi" });
    res.json(size);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ O‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const size = await MedicineSize.findByIdAndDelete(req.params.id);
    if (!size) return res.status(404).json({ error: "Topilmadi" });
    res.json({ message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
