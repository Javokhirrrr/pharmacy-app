// src/pages/MedicineTypes.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicineTypes = () => {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/medicine-types");
    setTypes(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/medicine-types/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/medicine-types", form);
    }
    setForm({ name: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/medicine-types/${id}`);
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">💊 Dori shakllari</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          placeholder="Masalan: Tabletka, Sirop..."
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
            <th className="border p-2">Shakl nomi</th>
            <th className="border p-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type, index) => (
            <tr key={type._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{type.name}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setForm({ name: type.name });
                    setEditingId(type._id);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(type._id)}
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

export default MedicineTypes;
