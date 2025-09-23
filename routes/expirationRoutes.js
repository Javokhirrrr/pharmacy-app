const express = require("express");
const router = express.Router();
const ExpirationTracking = require("../models/ExpirationTracking");
const Product = require("../models/Product");

// 🔹 Barcha kuzatuv yozuvlari
router.get("/", async (req, res) => {
  try {
    const expirations = await ExpirationTracking.find()
      .populate("product_id", "name barcode expiry_date");
    res.json(expirations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi kuzatuv qo‘shish
router.post("/", async (req, res) => {
  try {
    const { product_id, expiry_date } = req.body;

    let status = "normal";
    const now = new Date();
    const diffDays = Math.ceil((new Date(expiry_date) - now) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) status = "expired";
    else if (diffDays <= 30) status = "warning";

    const tracking = new ExpirationTracking({ product_id, expiry_date, status });
    await tracking.save();

    res.status(201).json(tracking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta yozuvni olish
router.get("/:id", async (req, res) => {
  try {
    const tracking = await ExpirationTracking.findById(req.params.id)
      .populate("product_id", "name barcode expiry_date");
    if (!tracking) return res.status(404).json({ error: "Yozuv topilmadi" });
    res.json(tracking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Statusni yangilash
router.put("/:id", async (req, res) => {
  try {
    const tracking = await ExpirationTracking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tracking) return res.status(404).json({ error: "Yozuv topilmadi" });
    res.json(tracking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 O‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const tracking = await ExpirationTracking.findByIdAndDelete(req.params.id);
    if (!tracking) return res.status(404).json({ error: "Yozuv topilmadi" });
    res.json({ message: "Yozuv o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
