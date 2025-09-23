// src/pages/Locations.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ shelf: "", row: "", position: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/locations");
    setLocations(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/locations/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/locations", form);
    }
    setForm({ shelf: "", row: "", position: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/locations/${id}`);
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🏬 Ombor joylashuvlari</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={form.shelf}
          onChange={(e) => setForm({ ...form, shelf: e.target.value })}
          placeholder="Pol"
          className="border p-2 rounded w-32"
          required
        />
        <input
          type="text"
          value={form.row}
          onChange={(e) => setForm({ ...form, row: e.target.value })}
          placeholder="Qator"
          className="border p-2 rounded w-32"
          required
        />
        <input
          type="text"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          placeholder="Joy"
          className="border p-2 rounded w-32"
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
            <th className="border p-2">Pol</th>
            <th className="border p-2">Qator</th>
            <th className="border p-2">Joy</th>
            <th className="border p-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc, index) => (
            <tr key={loc._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{loc.shelf}</td>
              <td className="border p-2">{loc.row}</td>
              <td className="border p-2">{loc.position}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setForm({ shelf: loc.shelf, row: loc.row, position: loc.position });
                    setEditingId(loc._id);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(loc._id)}
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

export default Locations;
