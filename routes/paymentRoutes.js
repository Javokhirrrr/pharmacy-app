const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Client = require("../models/Client");

// 🔹 Barcha to‘lovlarni olish
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("client_id", "name phone")
      .populate("sale_id", "total_amount sale_date");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi to‘lov qo‘shish
router.post("/", async (req, res) => {
  try {
    const { client_id, sale_id, amount, method } = req.body;

    // 🔹 Yangi to‘lov yaratish
    const payment = new Payment({ client_id, sale_id, amount, method });
    await payment.save();

    // 🔹 Mijozning qarzdorligini yangilash
    await Client.findByIdAndUpdate(client_id, {
      $inc: { total_paid: amount, total_debt: -amount }
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta to‘lovni olish
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("client_id", "name phone")
      .populate("sale_id", "total_amount sale_date");
    if (!payment) return res.status(404).json({ error: "To‘lov topilmadi" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 To‘lovni yangilash
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ error: "To‘lov topilmadi" });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 To‘lovni o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ error: "To‘lov topilmadi" });

    // ❗️ O‘chirilganda mijozning qarzi qayta yangilanadi
    await Client.findByIdAndUpdate(payment.client_id, {
      $inc: { total_paid: -payment.amount, total_debt: payment.amount }
    });

    res.json({ message: "To‘lov o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
