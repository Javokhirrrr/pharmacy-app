const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

// ➕ Yangi joy qo‘shish
router.post("/", async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Barcha joylarni olish
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Bitta joyni olish
router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ error: "Topilmadi" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Yangilash
router.put("/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) return res.status(404).json({ error: "Topilmadi" });
    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ O‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json({ error: "Topilmadi" });
    res.json({ message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
