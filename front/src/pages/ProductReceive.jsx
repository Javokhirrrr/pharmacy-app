// src/pages/ProductReceive.jsx
import React, { useState, useEffect } from "react";
import Form from "../components/Form";

const ProductReceive = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempList, setTempList] = useState([]);
  const [receives, setReceives] = useState([]);
  const [editModal, setEditModal] = useState({ open: false, receive: null });
  const [loadingProducts, setLoadingProducts] = useState(false);

  const apiUrl = "http://localhost:5000/api/products";
  const suppliersUrl = "http://localhost:5000/api/suppliers";
  const receiveUrl = "http://localhost:5000/api/receive";
  const stockMovementUrl = "http://localhost:5000/api/stocks";

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
    fetchReceives();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const res = await fetch(apiUrl);
    setProducts(await res.json());
    setLoadingProducts(false);
  };

  const fetchSuppliers = async () => {
    const res = await fetch(suppliersUrl);
    setSuppliers(await res.json());
  };

  const fetchReceives = async () => {
    const res = await fetch(receiveUrl);
    const data = await res.json();
    const today = new Date().toISOString().slice(0, 10);
    setReceives(data.filter(r => r.date.slice(0, 10) === today));
  };

  const handleProductSelect = () => {
    if (!productSearch.trim()) return alert("Mahsulot nomi yoki barcode kiriting!");
    const filtered = products.filter(p =>
      (p.barcode && p.barcode.toString().includes(productSearch.trim())) ||
      (p.name && p.name.toLowerCase().includes(productSearch.trim().toLowerCase()))
    );
    if (filtered.length === 0) return alert("Mahsulot topilmadi!");
    setSelectedProduct(filtered[0]);
    setProductSearch("");
  };

  const addToTempList = (formData) => {
    if (!selectedProduct) return;
    setTempList(prev => [
      ...prev,
      {
        product: selectedProduct,
        quantity: parseInt(formData.quantity),
        expiry_date: formData.expiry_date,
        supplier_id: formData.supplier_id,
      }
    ]);
    setSelectedProduct(null);
  };

  const saveAllReceives = async () => {
    for (let item of tempList) {
      // 1️⃣ Mahsulotni yangilash
      const updatedProduct = {
        ...item.product,
        quantity: (item.product.quantity || 0) + item.quantity,
        expiry_date: item.expiry_date,
        supplier_id: item.supplier_id,
      };
      await fetch(`${apiUrl}/${item.product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      // 2️⃣ Receive yaratish
      const resReceive = await fetch(receiveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: item.product._id,
          quantity: item.quantity,
          expiry_date: item.expiry_date,
          supplier_id: item.supplier_id,
          date: new Date(),
        }),
      });
      const savedReceive = await resReceive.json();

      // 3️⃣ StockMovement yozish
      await fetch(stockMovementUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: item.product._id,
          type: "in",
          quantity: item.quantity,
          note: `Prixod ID: ${savedReceive._id}`,
          date: new Date(),
        }),
      });
    }

    alert("Barcha prixodlar va stock harakatlar saqlandi!");
    setTempList([]);
    setModalOpen(false);
    fetchProducts();
    fetchReceives();
  };

  const handleDeleteReceive = async (id) => {
    if (!window.confirm("Rostdan ham o‘chirmoqchimisiz?")) return;
    await fetch(`${receiveUrl}/${id}`, { method: "DELETE" });
    fetchReceives();
  };

  const handleEditReceive = (receive) => {
    setEditModal({ open: true, receive });
  };

  const saveEditReceive = async (formData) => {
    const receive = editModal.receive;

    await fetch(`${receiveUrl}/${receive._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...receive,
        quantity: parseInt(formData.quantity),
        expiry_date: formData.expiry_date,
        supplier_id: formData.supplier_id,
      }),
    });

    // Mahsulot miqdorini yangilash
    const product = products.find(p => p._id === receive.product_id);
    if (product) {
      const updatedQuantity = product.quantity - receive.quantity + parseInt(formData.quantity);
      await fetch(`${apiUrl}/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, quantity: updatedQuantity }),
      });
    }

    alert("Prixod yangilandi!");
    setEditModal({ open: false, receive: null });
    fetchProducts();
    fetchReceives();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Mahsulotlarni qabul qilish</h2>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition mb-6"
      >
        + Prixod qo‘shish
      </button>

      {/* 🔹 Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-xl p-6 w-2/3 max-h-[80vh] overflow-auto relative shadow-lg">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-red-600 font-bold text-2xl"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-700">Prixodga mahsulot qo‘shish</h3>

            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Mahsulot nomi yoki barcode..."
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                className="border px-4 py-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onKeyDown={e => e.key === "Enter" && handleProductSelect()}
                disabled={loadingProducts}
              />
              <button
                onClick={handleProductSelect}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                disabled={loadingProducts}
              >
                Tanlash
              </button>
            </div>

            {selectedProduct && (
              <Form
                fields={[
                  { name: "quantity", type: "number", label: "Miqdor", required: true },
                  { name: "expiry_date", type: "date", label: "Amal qilish muddati", required: true },
                  {
                    name: "supplier_id",
                    type: "select",
                    label: "Yetkazib beruvchi",
                    options: suppliers.map(s => ({ value: s._id, label: s.name })),
                    required: true,
                  },
                ]}
                initialValues={{
                  quantity: "",
                  expiry_date: "",
                  supplier_id: selectedProduct.supplier_id?._id || "",
                }}
                onSubmit={addToTempList}
              />
            )}

            {tempList.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-gray-700">Ro‘yxat</h4>
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-3 py-1">№</th>
                      <th className="border px-3 py-1">Mahsulot</th>
                      <th className="border px-3 py-1">Miqdor</th>
                      <th className="border px-3 py-1">Amal qilish muddati</th>
                      <th className="border px-3 py-1">Yetkazib beruvchi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tempList.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-2 py-1">{index + 1}</td>
                        <td className="border px-2 py-1">{item.product.name}</td>
                        <td className="border px-2 py-1">{item.quantity}</td>
                        <td className="border px-2 py-1">{new Date(item.expiry_date).toLocaleDateString()}</td>
                        <td className="border px-2 py-1">{suppliers.find(s => s._id === item.supplier_id)?.name || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={saveAllReceives}
                  className="mt-3 bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
                  Saqlash
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReceive;
