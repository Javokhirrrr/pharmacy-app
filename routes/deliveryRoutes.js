const express = require("express");
const router = express.Router();
const Delivery = require("../models/Delivery");

// 🔹 Barcha yetkazib berishlar
router.get("/", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi yetkazib berish qo‘shish
router.post("/", async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta yetkazib berishni olish
router.get("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ error: "Yetkazib berish topilmadi" });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yetkazib berishni yangilash
router.put("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!delivery) return res.status(404).json({ error: "Yetkazib berish topilmadi" });
    res.json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Yetkazib berishni o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) return res.status(404).json({ error: "Yetkazib berish topilmadi" });
    res.json({ message: "Yetkazib berish o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
