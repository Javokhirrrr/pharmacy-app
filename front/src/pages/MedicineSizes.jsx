// src/pages/MedicineSizes.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicineSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [form, setForm] = useState({ value: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/medicine-sizes");
      setSizes(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/medicine-sizes/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/medicine-sizes", form);
      }
      setForm({ value: "" });
      fetchData();
    } catch (err) {
      console.error("❌ Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/medicine-sizes/${id}`);
      fetchData();
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📏 Dori o‘lchamlari</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={form.value}
          onChange={(e) => setForm({ value: e.target.value })}
          placeholder="Masalan: 100mg, 200ml, 500gr..."
          className="border p-2 rounded w-64"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "✏️ Yangilash" : "➕ Qo‘shish"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">O‘lcham</th>
            <th className="border p-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, index) => (
            <tr key={size._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{size.value}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setForm({ value: size.value });
                    setEditingId(size._id);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(size._id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineSizes;
