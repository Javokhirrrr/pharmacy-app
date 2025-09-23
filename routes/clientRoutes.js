const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// 🔹 Barcha mijozlarni olish
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Yangi mijoz qo‘shish
router.post("/", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta mijozni olish
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: "Mijoz topilmadi" });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Mijozni yangilash
router.put("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ error: "Mijoz topilmadi" });
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Mijozni o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: "Mijoz topilmadi" });
    res.json({ message: "Mijoz o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
