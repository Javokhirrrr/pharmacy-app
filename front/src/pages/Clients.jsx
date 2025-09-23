// src/pages/Clients.jsx
import React, { useState, useEffect } from "react";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [debtClient, setDebtClient] = useState(null);

  const apiUrl = "http://localhost:5000/api/clients";

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Yangi mijoz qo‘shish
  const handleAddClient = async (formData) => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          total_debt: parseFloat(formData.total_debt) || 0,
          total_paid: 0
        }),
      });
      if (!res.ok) throw new Error("Xatolik yuz berdi!");
      setIsAddModalOpen(false);
      fetchClients();
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Mijozni tahrirlash
  const handleEditClient = async (formData) => {
    try {
      const res = await fetch(`${apiUrl}/${editClient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          total_debt: parseFloat(formData.total_debt) || 0,
        }),
      });
      if (!res.ok) throw new Error("Xatolik yuz berdi!");
      setIsEditModalOpen(false);
      setEditClient(null);
      fetchClients();
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Mijozni o‘chirish
  const handleDeleteClient = async (id) => {
    if (!window.confirm("Rostdan ham o‘chirmoqchimisiz?")) return;
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      fetchClients();
    } catch (err) {
      alert("Xatolik yuz berdi!");
    }
  };

  // 🔹 Qarz qo‘shish/yopish
  const handleDebt = async (amount) => {
    if (!debtClient) return;
    const updatedDebt = debtClient.total_debt + parseFloat(amount || 0);
    try {
      await fetch(`${apiUrl}/${debtClient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total_debt: updatedDebt }),
      });
      setIsDebtModalOpen(false);
      setDebtClient(null);
      fetchClients();
    } catch (err) {
      alert("Xatolik yuz berdi!");
    }
  };

  // 🔹 To‘lov qo‘shish (qarz kamayadi, total_paid oshadi)
  const handlePayment = async (amount) => {
    if (!debtClient) return;
    const numAmount = parseFloat(amount || 0);
    const updatedDebt = debtClient.total_debt - numAmount;
    const updatedPaid = debtClient.total_paid + numAmount;

    try {
      await fetch(`${apiUrl}/${debtClient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_debt: updatedDebt,
          total_paid: updatedPaid
        }),
      });
      setIsDebtModalOpen(false);
      setDebtClient(null);
      fetchClients();
    } catch (err) {
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mijozlar</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Yangi mijoz
        </button>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">№</th>
            <th className="border px-4 py-2">Klinika nomi</th>
            <th className="border px-4 py-2">Mas'ul shaxs</th>
            <th className="border px-4 py-2">Telefon</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Umumiy to‘langan summa</th>
            <th className="border px-4 py-2">Hozirgi qarzdorlik</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c, index) => (
            <tr key={c._id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">{c.contact_person || "-"}</td>
              <td className="border px-4 py-2">{c.phone}</td>
              <td className="border px-4 py-2">{c.email || "-"}</td>
              <td className="border px-4 py-2">{c.total_paid.toLocaleString("uz-UZ")}</td>
              <td className="border px-4 py-2">{c.total_debt.toLocaleString("uz-UZ")}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => { setEditClient(c); setIsEditModalOpen(true); }}
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                >
                  Tahrirlash
                </button>
                <button
                  onClick={() => { setDebtClient(c); setIsDebtModalOpen(true); }}
                  className="bg-purple-500 px-2 py-1 rounded text-white mr-2"
                >
                  Qarz qo‘shish/yopish
                </button>
                <button
                  onClick={() => handleDeleteClient(c._id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Yangi mijoz qo‘shish</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-red-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              handleAddClient({
                name: form.name.value,
                contact_person: form.contact_person.value,
                phone: form.phone.value,
                email: form.email.value,
                total_debt: form.total_debt.value
              });
            }}>
              <div className="flex flex-col gap-4">
                <input name="name" placeholder="Klinika nomi" className="border px-4 py-2 rounded" required/>
                <input name="contact_person" placeholder="Mas'ul shaxs" className="border px-4 py-2 rounded"/>
                <input name="phone" placeholder="Telefon" className="border px-4 py-2 rounded" required/>
                <input name="email" placeholder="Email" className="border px-4 py-2 rounded"/>
                <input name="total_debt" type="number" placeholder="Boshlang‘ich qarz" className="border px-4 py-2 rounded"/>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Edit Client Modal */}
      {isEditModalOpen && editClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Mijozni tahrirlash</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-red-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              handleEditClient({
                name: form.name.value,
                contact_person: form.contact_person.value,
                phone: form.phone.value,
                email: form.email.value,
                total_debt: form.total_debt.value
              });
            }}>
              <div className="flex flex-col gap-4">
                <input name="name" defaultValue={editClient.name} placeholder="Klinika nomi" className="border px-4 py-2 rounded" required/>
                <input name="contact_person" defaultValue={editClient.contact_person} placeholder="Mas'ul shaxs" className="border px-4 py-2 rounded"/>
                <input name="phone" defaultValue={editClient.phone} placeholder="Telefon" className="border px-4 py-2 rounded" required/>
                <input name="email" defaultValue={editClient.email} placeholder="Email" className="border px-4 py-2 rounded"/>
                <input name="total_debt" type="number" defaultValue={editClient.total_debt} placeholder="Boshlang‘ich qarz" className="border px-4 py-2 rounded"/>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Debt Modal (qarz qo‘shish/yopish + to‘lov qo‘shish) */}
      {isDebtModalOpen && debtClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Qarz bilan ishlash</h3>
              <button onClick={() => setIsDebtModalOpen(false)} className="text-red-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const amount = parseFloat(e.target.amount.value);
              const type = e.target.type.value;
              if(type === "add") handleDebt(amount);
              else handlePayment(amount);
            }}>
              <div className="flex flex-col gap-4">
                <p>Mijoz: <strong>{debtClient.name}</strong></p>
                <input name="amount" type="number" placeholder="Summani kiriting" className="border px-4 py-2 rounded" required/>
                <select name="type" className="border px-4 py-2 rounded">
                  <option value="add">Qarz qo‘shish</option>
                  <option value="pay">To‘lov qo‘shish</option>
                </select>
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Clients;
