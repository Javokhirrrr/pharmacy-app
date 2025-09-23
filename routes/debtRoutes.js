const express = require("express");
const router = express.Router();
const Debt = require("../models/Debt");
const Client = require("../models/Client");

// 🔹 Barcha qarzdorliklar
router.get("/", async (req, res) => {
  try {
    const debts = await Debt.find().populate("customer_id", "name phone");
    res.json(debts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi qarzdorlik qo‘shish
router.post("/", async (req, res) => {
  try {
    const { customer_id, amount, due_date } = req.body;

    const debt = new Debt({ customer_id, amount, due_date });
    await debt.save();

    // 🔹 Clientning qarzi oshadi
    await Client.findByIdAndUpdate(customer_id, { $inc: { total_debt: amount } });

    res.status(201).json(debt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta qarzni olish
router.get("/:id", async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id).populate("customer_id", "name phone");
    if (!debt) return res.status(404).json({ error: "Qarz topilmadi" });
    res.json(debt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Qarzni to‘langan deb belgilash
router.put("/:id/pay", async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ error: "Qarz topilmadi" });

    debt.status = "paid";
    await debt.save();

    // 🔹 Clientning qarzi kamayadi
    await Client.findByIdAndUpdate(debt.customer_id, { $inc: { total_debt: -debt.amount, total_paid: debt.amount } });

    res.json({ message: "Qarz yopildi", debt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Qarzni o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const debt = await Debt.findByIdAndDelete(req.params.id);
    if (!debt) return res.status(404).json({ error: "Qarz topilmadi" });

    res.json({ message: "Qarz o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
