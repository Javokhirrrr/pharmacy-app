import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Form from "../components/Form";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const apiUrl = "http://localhost:5000/api/suppliers";
  const columns = ["Name", "Contact Person", "Phone", "Email", "Address"];

  const fetchSuppliers = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const formatted = data.map((s) => ({
        Name: s.name,
        "Contact Person": s.contact_person || "",
        Phone: s.phone,
        Email: s.email || "",
        Address: s.address || "",
        _id: s._id,
      }));
      setSuppliers(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const addSupplier = async (supplier) => {
    try {
      const body = {
        name: supplier.Name,
        contact_person: supplier["Contact Person"],
        phone: supplier.Phone,
        email: supplier.Email,
        address: supplier.Address,
      };

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Xatolik: " + data.error);
        return;
      }

      setIsAddModalOpen(false);
      fetchSuppliers();
    } catch (err) {
      console.error(err);
    }
  };

  const editSupplierSubmit = async (supplier) => {
    try {
      const body = {
        name: supplier.Name,
        contact_person: supplier["Contact Person"],
        phone: supplier.Phone,
        email: supplier.Email,
        address: supplier.Address,
      };

      const res = await fetch(`${apiUrl}/${editSupplier._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Xatolik: " + data.error);
        return;
      }

      setIsEditModalOpen(false);
      setEditSupplier(null);
      fetchSuppliers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSupplier = async (id) => {
    if (!window.confirm("Rostdan ham yetkazib beruvchini o‘chirmoqchimisiz?")) return;
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      fetchSuppliers();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Qidiruv
  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.Phone.includes(searchTerm)
  );

  // 📄 Paginatsiya
  const totalPages = Math.ceil(filteredSuppliers.length / visibleCount);
  const startIdx = (currentPage - 1) * visibleCount;
  const paginatedSuppliers = filteredSuppliers.slice(startIdx, startIdx + visibleCount);

  const tableData = paginatedSuppliers.map((s) => ({
    ...s,
    Actions: (
      <div className="flex gap-2">
        <button
          onClick={() => {
            setEditSupplier(s);
            setIsEditModalOpen(true);
          }}
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
        >
          Tahrirlash
        </button>
        <button
          onClick={() => deleteSupplier(s._id)}
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
        >
          O‘chirish
        </button>
      </div>
    ),
  }));

  const tableColumns = [...columns, "Actions"];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Yetkazib beruvchilar</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Yangi yetkazib beruvchi
        </button>
      </div>

      {/* 🔍 Qidiruv + Limit */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Qidiruv (nomi yoki telefon)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // qidiruvda birinchi sahifaga o'tish
          }}
          className="border px-4 py-2 rounded w-1/3"
        />
        <select
          value={visibleCount}
          onChange={(e) => {
            setVisibleCount(parseInt(e.target.value));
            setCurrentPage(1); // limit o‘zgarganda sahifa reset
          }}
          className="border px-4 py-2 rounded w-1/6"
        >
          <option value={5}>5 ta</option>
          <option value={10}>10 ta</option>
          <option value={20}>20 ta</option>
          <option value={50}>50 ta</option>
        </select>
      </div>

      {/* 📋 Jadval */}
      <Table columns={tableColumns} data={tableData} />

      {/* 🔢 Paginatsiya tugmalari */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          &lt; Oldingi
        </button>
        <span className="px-2 py-1">
          {currentPage} / {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Keyingi &gt;
        </button>
      </div>

      {/* ➕ Add Supplier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Yangi yetkazib beruvchi qo‘shish</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-red-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            <Form
              fields={[
                { name: "Name", type: "text", required: true, label: "Firma nomi" },
                { name: "Contact Person", type: "text", label: "Mas’ul shaxs" },
                { name: "Phone", type: "text", required: true, label: "Telefon" },
                { name: "Email", type: "text", label: "Email" },
                { name: "Address", type: "text", label: "Manzil" },
              ]}
              initialValues={{
                Name: "",
                "Contact Person": "",
                Phone: "",
                Email: "",
                Address: "",
              }}
              onSubmit={addSupplier}
            />
          </div>
        </div>
      )}

      {/* ✏️ Edit Supplier Modal */}
      {isEditModalOpen && editSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tahrirlash</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-red-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            <Form
              fields={[
                { name: "Name", type: "text", required: true, label: "Firma nomi" },
                { name: "Contact Person", type: "text", label: "Mas’ul shaxs" },
                { name: "Phone", type: "text", required: true, label: "Telefon" },
                { name: "Email", type: "text", label: "Email" },
                { name: "Address", type: "text", label: "Manzil" },
              ]}
              initialValues={{
                Name: editSupplier.Name,
                "Contact Person": editSupplier["Contact Person"],
                Phone: editSupplier.Phone,
                Email: editSupplier.Email,
                Address: editSupplier.Address,
              }}
              onSubmit={editSupplierSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
