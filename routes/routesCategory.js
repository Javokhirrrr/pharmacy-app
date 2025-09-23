const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// 🔹 Barcha kategoriyalarni olish
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Bitta kategoriya olish (ID bo‘yicha)
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Yangi kategoriya qo‘shish
router.post("/", async (req, res) => {
  const category = new Category({ name: req.body.name });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 Kategoriyani yangilash
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });

    category.name = req.body.name || category.name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 Kategoriyani o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });

    await category.remove();
    res.json({ message: "Kategoriya o‘chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
