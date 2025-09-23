const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ Yangi mahsulot qo‘shish
router.post("/", async (req, res) => {
  try {
    const {
      name,
      barcode,
      price,
      quantity,
      expiry_date,
      supplier_id,
      manufacturer,
      type,
      size,
      location,
      batch_number,
    } = req.body;

    const newProduct = new Product({
      name,
      barcode,
      price,
      quantity,
      expiry_date,
      supplier_id,
      manufacturer,
      type,
      size,
      location,
      batch_number,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Mahsulot qo‘shishda xatolik", error });
  }
});

// ✅ Barcha mahsulotlarni olish
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("supplier_id");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Mahsulotlarni olishda xatolik", error });
  }
});

// ✅ Bitta mahsulotni olish
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("supplier_id");
    if (!product) return res.status(404).json({ message: "Mahsulot topilmadi" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni olishda xatolik", error });
  }
});

// ✅ Mahsulotni yangilash
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Mahsulot topilmadi" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Mahsulotni yangilashda xatolik", error });
  }
});

// ✅ Mahsulotni o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Mahsulot topilmadi" });
    res.json({ message: "Mahsulot o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni o‘chirishda xatolik", error });
  }
});

module.exports = router;
