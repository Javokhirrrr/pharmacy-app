// src/components/DebtModal.jsx
import React, { useState, useEffect } from "react";

const DebtModal = ({ client, isOpen, onClose, onSave }) => {
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("cash");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (client) setAmount(0);
  }, [client]);

  if (!isOpen || !client) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yangi qarz qo'shish / qarz yopish
    onSave({
      amount: parseFloat(amount),
      paymentType,
      note
    });
    setAmount(0);
    setNote("");
  };

  const newDebt = client.total_debt - amount;
  const totalPaid = amount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Mijozdan yangi to‘lov</h3>
          <button onClick={onClose} className="text-red-600 font-bold text-xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label>Contragent:</label>
            <input type="text" value={client.name} readOnly className="border px-2 py-1 w-full rounded"/>
          </div>
          <div>
            <label>Kassa:</label>
            <input type="text" value="Kassa" readOnly className="border px-2 py-1 w-full rounded"/>
          </div>
          <div className="flex gap-2 items-center">
            <label>To‘lov:</label>
            <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="border px-2 py-1 rounded">
              <option value="cash">Naqd</option>
              <option value="bank">Bank</option>
              <option value="transfer">Transfer</option>
            </select>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border px-2 py-1 rounded flex-1" />
            <span>UZS</span>
          </div>
          <div>
            <label>Ma'lumot:</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} className="border px-2 py-1 w-full rounded"/>
          </div>

          {/* Hisoblangan summalar */}
          <div className="flex justify-between text-sm mt-2">
            <div>Umumiy qarz: {client.total_debt.toLocaleString("uz-UZ")}</div>
            <div>To‘lov: {totalPaid.toLocaleString("uz-UZ")}</div>
            <div>Qarz: {newDebt.toLocaleString("uz-UZ")}</div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">Bekor qilish</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Saqlash</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DebtModal;
