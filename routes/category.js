// routes/category.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// 🔹 Yangi kategoriya yaratish
router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Barcha kategoriyalarni olish
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Bitta kategoriyani olish
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Topilmadi" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangilash
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ error: "Topilmadi" });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 O‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Topilmadi" });
    res.json({ message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
