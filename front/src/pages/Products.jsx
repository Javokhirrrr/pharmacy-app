import React, { useEffect, useState } from "react";
import axios from "axios";

// 📌 API konfiguratsiya
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 📌 Mahsulot modal (to‘liq qo‘shish/tahrirlash)
const Modal = ({ isOpen, onClose, onSubmit, formData, setFormData, suppliers }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[800px] max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          {formData._id ? "✏️ Mahsulotni tahrirlash" : "➕ Yangi mahsulot qo‘shish"}
        </h2>

        {/* Forma maydonlari */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Mahsulot nomi</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Shtrix-kod</label>
            <input
              name="barcode"
              value={formData.barcode || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Chakana narx</label>
            <input
              name="retail"
              type="number"
              value={formData.retail || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Ulgurji narx</label>
            <input
              name="wholesale"
              type="number"
              value={formData.wholesale || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Kirim narx</label>
            <input
              name="purchase"
              type="number"
              value={formData.purchase || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          

          <div>
            <label>Qoldiq</label>
            <input
              name="quantity"
              type="number"
              value={formData.quantity || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Amal qilish muddati</label>
            <input
              name="expiry_date"
              type="date"
              value={formData.expiry_date?.slice(0, 10) || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          
          <div>
           <label>Ishlab chiqaruvchi</label>
           <input
             list="suppliersList"
             name="manufacturer"
             value={formData.manufacturer || ""}
             onChange={handleChange}
             className="w-full border p-2 rounded"
             placeholder="Ism yoki telefon yozing..."
           />
           <datalist id="suppliersList">
             {suppliers.map((s) => (
               <option key={s._id} value={s.name}>
                 {s.name} ({s.phone})
               </option>
              ))}
           </datalist>
         </div>


          <div>
  <label>Dori shakli</label>
  <input
    list="typesList"
    name="type"
    value={formData.type || ""}
    onChange={handleChange}
    className="w-full border p-2 rounded"
    placeholder="Masalan: tabletka, sirop..."
  />
  <datalist id="typesList">
    {["Tabletka", "Kapsula", "Sirop", "Inyeksiya", "Malham", "Sprey", "Krem"].map((t, idx) => (
      <option key={idx} value={t} />
    ))}
  </datalist>
</div>


          <div>
  <label>Dori o‘lchami</label>
  <input
    list="sizesList"
    name="size"
    value={formData.size || ""}
    onChange={handleChange}
    className="w-full border p-2 rounded"
    placeholder="Masalan: 100mg yoki 200ml..."
  />
  <datalist id="sizesList">
    {["50mg", "100mg", "200mg", "500mg", "100ml", "200ml", "50g", "100g"].map((s, idx) => (
      <option key={idx} value={s} />
    ))}
  </datalist>
</div>


          <div>
            <label>Partiya raqami</label>
            <input
              name="batch_number"
              value={formData.batch_number || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-400 text-white">
            Bekor qilish
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};

// 📌 Faqat qoldiqni o‘zgartirish modal
const QuantityModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">
        <h2 className="text-lg font-semibold mb-4">📦 Qoldiqni o‘zgartirish</h2>
        <input
          type="number"
          name="quantity"
          value={formData.quantity || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, quantity: e.target.value }))
          }
          className="w-full border p-2 rounded"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-400 text-white"
          >
            Bekor qilish
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // 📌 Mahsulotlarni olish
  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  // 📌 Yetkazib beruvchilarni olish
  const fetchSuppliers = async () => {
    const res = await api.get("/suppliers");
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  // 📌 Filter va sort
  const filtered = products
  .filter(
    (p) =>
      (p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode?.toLowerCase().includes(search.toLowerCase())) &&
      (supplierFilter
        ? (p.supplier_id?.name?.toLowerCase().includes(supplierFilter.toLowerCase()) ||
           p.supplier_id?.phone?.toLowerCase().includes(supplierFilter.toLowerCase()))
        : true)
  )
  .sort((a, b) => {
    if (!sortField) return 0;
    const valA =
      sortField === "retail"
        ? a.price.retail
        : sortField === "wholesale"
        ? a.price.wholesale
        : sortField === "purchase"
        ? a.price.purchase
        : a.quantity;
    const valB =
      sortField === "retail"
        ? b.price.retail
        : sortField === "wholesale"
        ? b.price.wholesale
        : sortField === "purchase"
        ? b.price.purchase
        : b.quantity;
    return sortOrder === "asc" ? valA - valB : valB - valA;
  });


  const paginated = filtered.slice((page - 1) * limit, page * limit);

  // 📌 Saqlash (qo‘shish yoki tahrirlash)
  const handleSave = async () => {
    const data = {
      ...formData,
      price: {
        retail: formData.retail,
        wholesale: formData.wholesale,
        purchase: formData.purchase,
      },
    };

    if (formData._id) {
      await api.put(`/products/${formData._id}`, data);
    } else {
      await api.post("/products", data);
    }
    setIsModalOpen(false);
    setFormData({});
    fetchProducts();
  };

  // 📌 Faqat qoldiqni saqlash
  const handleSaveQuantity = async () => {
    await api.put(`/products/${formData._id}`, {
      quantity: formData.quantity,
    });
    setIsQuantityModalOpen(false);
    setFormData({});
    fetchProducts();
  };

  // 📌 O‘chirish
  const handleDelete = async (id) => {
    if (window.confirm("Rostan ham o‘chirmoqchimisiz?")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-4">
      {/* Sarlavha */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">📦 Mahsulotlar</h1>
        <button
          onClick={() => {
            setFormData({});
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Yangi mahsulot
        </button>
      </div>

      {/* Qidirish */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="🔍 Nomi yoki shtrix-kod bo‘yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          placeholder="📌 Yetkazib beruvchi ismi..."
          value={supplierFilter}
          onChange={(e) => setSupplierFilter(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {/* Jadval */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Nomi / Shtrix-kod</th>
            <th className="border p-2">Partiya raqami</th>
            <th className="border p-2">Dori shakli</th>
            <th className="border p-2">Ishlab chiqaruvchi</th>
            <th className="border p-2 cursor-pointer" onClick={() => setSortField("retail")}>
              Chakana narx
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => setSortField("wholesale")}>
              Ulgurji narx
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => setSortField("purchase")}>
              Kirim narx
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => setSortField("quantity")}>
              Qoldiq
            </th>
            <th className="border p-2">Yetkazib beruvchi</th>
            <th className="border p-2">Amal muddati</th>
            <th className="border p-2">⚙️</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((p) => (
            <tr key={p._id} className="hover:bg-gray-100">
              <td className="border p-2">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">{p.barcode}</div>
              </td>
              <td className="border p-2">{p.batch_number}</td>
              <td className="border p-2">{p.type}</td>
              <td className="border p-2">{p.manufacturer}</td>
              <td className="border p-2">{p.price.retail}</td>
              <td className="border p-2">{p.price.wholesale}</td>
              <td className="border p-2">{p.price.purchase}</td>
              <td
                className="border p-2 cursor-pointer text-blue-600"
                onDoubleClick={() => {
                  setFormData({ _id: p._id, quantity: p.quantity });
                  setIsQuantityModalOpen(true);
                }}
              >
                {p.quantity}
              </td>
              <td className="border p-2">{p.supplier_id?.name}</td>
              <td className="border p-2">
                {p.expiry_date ? p.expiry_date.slice(0, 10) : ""}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => {
                    setFormData({
                      ...p,
                      retail: p.price.retail,
                      wholesale: p.price.wholesale,
                      purchase: p.price.purchase,
                    });
                    setIsModalOpen(true);
                  }}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          ⬅️ Oldingi
        </button>
        <span>
          {page} / {Math.ceil(filtered.length / limit)}
        </span>
        <button
          disabled={page * limit >= filtered.length}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Keyingi ➡️
        </button>
      </div>

      {/* Modallar */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        formData={formData}
        setFormData={setFormData}
        suppliers={suppliers}
      />

      <QuantityModal
        isOpen={isQuantityModalOpen}
        onClose={() => setIsQuantityModalOpen(false)}
        onSubmit={handleSaveQuantity}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Products;






// import React, { useState, useEffect } from "react";
// import Table from "../components/Table";
// import Form from "../components/Form";
// import ActionsDropdown from "../components/ActionsDropdown";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);

//   const [productSearch, setProductSearch] = useState("");
//   const [supplierSearch, setSupplierSearch] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [expiryFilter, setExpiryFilter] = useState("");
//   const [visibleCount, setVisibleCount] = useState(10);
//   const [productPage, setProductPage] = useState(1);

//   const sizeOptions = {
//     Tabletka: [{ value: "100mg", label: "100 mg" }, { value: "250mg", label: "250 mg" }, { value: "500mg", label: "500 mg" }],
//     Kapsula: [{ value: "250mg", label: "250 mg" }, { value: "400mg", label: "400 mg" }],
//     Sirop: [{ value: "100ml", label: "100 ml shisha idishda" }, { value: "200ml", label: "200 ml shisha idishda" }],
//     Inyeksiya: [{ value: "2ml", label: "2 ml ampula" }, { value: "5ml", label: "5 ml flakon" }],
//     Malham: [{ value: "10g", label: "10 g tuba" }, { value: "20g", label: "20 g tuba" }, { value: "50g", label: "50 g tuba" }],
//   };

//   const apiUrl = "http://localhost:5000/api/products";
//   const suppliersUrl = "http://localhost:5000/api/suppliers";
//   const expiryUrl = "http://localhost:5000/api/expiration"; // 🔹 ExpirationTracking API

//   useEffect(() => {
//     fetchProducts();
//     fetchSuppliers();
//   }, []);

//   const fetchProducts = async () => {
//     const res = await fetch(apiUrl);
//     const data = await res.json();

//     // 🔹 Expiration status qo‘shish
//     const now = new Date();
//     const enriched = data.map((p) => {
//       let status = "normal";
//       if (p.expiry_date) {
//         const exp = new Date(p.expiry_date);
//         const diffDays = (exp - now) / (1000 * 60 * 60 * 24);
//         if (diffDays < 0) status = "expired";
//         else if (diffDays <= 30) status = "warning";
//       }
//       return { ...p, expiry_status: status };
//     });

//     setProducts(enriched);
//   };

//   const fetchSuppliers = async () => {
//     const res = await fetch(suppliersUrl);
//     const data = await res.json();
//     setSuppliers(data);
//   };

//   const generateBarcode = () => {
//     let code = "";
//     for (let i = 0; i < 13; i++) code += Math.floor(Math.random() * 10);
//     return code;
//   };

//   const handleAddProduct = async (formData) => {
//     const body = {
//       name: formData.name,
//       manufacturer: formData.manufacturer,
//       size: formData.size,
//       type: formData.type,
//       category: formData.category,
//       barcode: formData.barcode || generateBarcode(),
//       quantity: formData.quantity,
//       expiry_date: formData.expiry_date,
//       supplier_id: formData.supplier_id,
//       price: {
//         retail: formData["price.retail"],
//         wholesale: formData["price.wholesale"],
//         purchase: formData["price.purchase"],
//       },
//     };

//     const res = await fetch(apiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     if (!res.ok) return alert("Xatolik yuz berdi!");
//     setIsAddModalOpen(false);
//     fetchProducts();
//   };

//   const handleEditProduct = async (formData) => {
//     const body = {
//       ...formData,
//       price: {
//         retail: formData["price.retail"],
//         wholesale: formData["price.wholesale"],
//         purchase: formData["price.purchase"],
//       },
//     };

//     const res = await fetch(`${apiUrl}/${editProduct._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     if (!res.ok) return alert("Xatolik yuz berdi!");
//     setIsEditModalOpen(false);
//     setEditProduct(null);
//     fetchProducts();
//   };

//   const handleQuantityUpdate = async () => {
//     const res = await fetch(`${apiUrl}/${editProduct._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity: editProduct.quantity }),
//     });

//     if (!res.ok) return alert("Xatolik!");
//     setIsQuantityModalOpen(false);
//     setEditProduct(null);
//     fetchProducts();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Rostdan ham o‘chirmoqchimisiz?")) return;
//     await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
//     fetchProducts();
//   };

//   // 🔍 Qidiruv + Filter
//   let filteredProducts = products.filter((p) => {
//     const matchesProduct =
//       p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
//       p.barcode?.toLowerCase().includes(productSearch.toLowerCase());

//     const matchesSupplier =
//       supplierSearch.trim() === "" ||
//       p.supplier_id?.name?.toLowerCase().includes(supplierSearch.toLowerCase()) ||
//       p.supplier_id?.phone?.slice(-4) === supplierSearch;

//     const matchesExpiry =
//       !expiryFilter || p.expiry_status === expiryFilter;

//     return matchesProduct && matchesSupplier && matchesExpiry;
//   });

//   // 🔽 Saralash
//   if (sortOption) {
//     const [field, order] = sortOption.split("-");
//     filteredProducts = [...filteredProducts].sort((a, b) => {
//       let valA = field === "quantity" ? a.quantity : a.price?.[field];
//       let valB = field === "quantity" ? b.quantity : b.price?.[field];
//       return order === "asc" ? valA - valB : valB - valA;
//     });
//   }

//   // 📌 Pagination
//   const productTotalPages = Math.ceil(filteredProducts.length / visibleCount);
//   const startIndex = (productPage - 1) * visibleCount;
//   const paginatedProducts = filteredProducts.slice(startIndex, startIndex + visibleCount);

//   const tableData = paginatedProducts.map((p, index) => ({
//     "№": index + 1 + (productPage - 1) * visibleCount,
//     "Tovar nomi": p.name,
//     "Ishlab chiqaruvchi": p.manufacturer || "-",
//     "O‘lcham": p.size || "-",
//     "Turi": p.type || "-",
//     "Toifa": p.category || "-",
//     "Qoldiq": p.quantity?.toLocaleString("uz-UZ") || 0,
//     "Chakana narx": p.price?.retail?.toLocaleString("uz-UZ") || "-",
//     "Ulgurji narx": p.price?.wholesale?.toLocaleString("uz-UZ") || "-",
//     "Kirim narxi": p.price?.purchase?.toLocaleString("uz-UZ") || "-",
//     "Yetkazib beruvchi": `${p.supplier_id?.name || ""} (${p.supplier_id?.phone || ""})`,
//     "Amal qilish muddati": p.expiry_date
//       ? `${new Date(p.expiry_date).toLocaleDateString("uz-UZ")} (${p.expiry_status})`
//       : "-",
//     Actions: (
//       <ActionsDropdown
//         onEdit={() => { setEditProduct(p); setIsEditModalOpen(true); }}
//         onQuantity={() => { setEditProduct({ _id: p._id, quantity: p.quantity }); setIsQuantityModalOpen(true); }}
//         onDelete={() => handleDelete(p._id)}
//       />
//     ),
//   }));

//   return (
//     <div>
//       {/* 🔝 Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Mahsulotlar</h2>
//         <button
//           onClick={() => setIsAddModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Yangi mahsulot
//         </button>
//       </div>

//       {/* 🔍 Qidiruv + Saralash + Filter */}
//       <div className="flex gap-4 mb-4 flex-wrap">
//         <input
//           type="text"
//           placeholder="Mahsulot nomi yoki barcode..."
//           value={productSearch}
//           onChange={(e) => setProductSearch(e.target.value)}
//           className="border px-4 py-2 rounded w-1/3"
//         />
//         <input
//           type="text"
//           placeholder="Yetkazib beruvchi (ismi yoki tel oxirgi 4 raqam)"
//           value={supplierSearch}
//           onChange={(e) => setSupplierSearch(e.target.value)}
//           className="border px-4 py-2 rounded w-1/3"
//         />
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="border px-4 py-2 rounded w-1/4"
//         >
//           <option value="">Saralash</option>
//           <option value="quantity-asc">Qoldiq ↑</option>
//           <option value="quantity-desc">Qoldiq ↓</option>
//           <option value="retail-asc">Chakana narx ↑</option>
//           <option value="retail-desc">Chakana narx ↓</option>
//           <option value="wholesale-asc">Ulgurji narx ↑</option>
//           <option value="wholesale-desc">Ulgurji narx ↓</option>
//           <option value="purchase-asc">Kirim narx ↑</option>
//           <option value="purchase-desc">Kirim narx ↓</option>
//         </select>
//         <select
//           value={expiryFilter}
//           onChange={(e) => setExpiryFilter(e.target.value)}
//           className="border px-4 py-2 rounded w-1/4"
//         >
//           <option value="">Amal qilish muddati</option>
//           <option value="7">7 kun ichida</option>
//           <option value="30">30 kun ichida</option>
//         </select>
//         <select
//           value={visibleCount}
//           onChange={(e) => {
//             setVisibleCount(parseInt(e.target.value));
//             setProductPage(1);
//           }}
//           className="border px-4 py-2 rounded w-1/4"
//         >
//           <option value={5}>5 ta mahsulot</option>
//           <option value={10}>10 ta mahsulot</option>
//           <option value={20}>20 ta mahsulot</option>
//           <option value={50}>50 ta mahsulot</option>
//         </select>
//       </div>
      

//       {/* 📋 Jadval */}
//       <Table
//         columns={[
//           "№",
//           "Tovar nomi",
//           "Ishlab chiqaruvchi",
//           "O‘lcham",
//           "Turi",
//           "Toifa",
//           "Qoldiq",
//           "Chakana narx",
//           "Ulgurji narx",
//           "Kirim narxi",
//           "Yetkazib beruvchi",
//           "Amal qilish muddati",
//           "Actions",
//         ]}
//         data={tableData}
//       />

//       {/* 🗂 Pagination */}
//       <div className="flex justify-center gap-2 mt-4">
//         <button
//           disabled={productPage === 1}
//           onClick={() => setProductPage(productPage - 1)}
//           className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
//         >
//           &lt; Oldingi
//         </button>
//         <span className="px-2 py-1">
//           {productPage} / {productTotalPages || 1}
//         </span>
//         <button
//           disabled={productPage === productTotalPages || productTotalPages === 0}
//           onClick={() => setProductPage(productPage + 1)}
//           className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
//         >
//           Keyingi &gt;
//         </button>
//       </div>

//       {/* ➕ Add Product Modal */}
//       {/* ➕ Add Product Modal */}
// {isAddModalOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-lg w-2/3 max-h-[90vh] overflow-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Yangi mahsulot qo‘shish</h3>
//         <button
//           onClick={() => setIsAddModalOpen(false)}
//           className="text-red-600 font-bold text-xl"
//         >
//           &times;
//         </button>
//       </div>
//       <Form
//         fields={[
//           { name: "name", type: "text", required: true, label: "Mahsulot nomi" },
//           { name: "manufacturer", type: "text", label: "Ishlab chiqaruvchi" },

//           {
//             name: "type",
//             type: "select",
//             label: "Dori shakli",
//             options: medicineTypes.map((t) => ({
//               value: t._id,
//               label: t.name,
//             })),
//           },
//           {
//             name: "size",
//             type: "select",
//             label: "O‘lcham",
//             options: medicineSizes.map((s) => ({
//               value: s._id,
//               label: s.name,
//             })),
//           },
//           {
//             name: "category",
//             type: "select",
//             label: "Farmakologik guruh",
//             options: categories.map((c) => ({
//               value: c._id,
//               label: c.name,
//             })),
//           },
//           {
//             name: "batch_number",
//             type: "text",
//             required: true,
//             label: "Partiya raqami",
//           },
//           {
//             name: "location",
//             type: "select",
//             label: "Mahsulot joylashuvi",
//             options: locations.map((l) => ({
//               value: l._id,
//               label: `${l.row}-${l.shelf}-${l.number}`, // qator/pol/raqam
//             })),
//           },

//           { name: "barcode", type: "text", label: "Barcode" },
//           { name: "price.retail", type: "number", required: true, label: "Chakana narx" },
//           { name: "price.wholesale", type: "number", label: "Ulgurji narx" },
//           { name: "price.purchase", type: "number", label: "Kirim narx" },
//           { name: "quantity", type: "number", label: "Miqdor" },
//           { name: "expiry_date", type: "date", required: true, label: "Amal qilish muddati" },
//           {
//             name: "supplier_id",
//             type: "select",
//             options: suppliers.map((s) => ({ value: s._id, label: s.name })),
//             label: "Yetkazib beruvchi",
//           },
//         ]}
//         initialValues={{
//           name: "",
//           manufacturer: "",
//           size: "",
//           type: "",
//           category: "",
//           batch_number: "",
//           location: "",
//           barcode: "",
//           "price.retail": "",
//           "price.wholesale": "",
//           "price.purchase": "",
//           quantity: "",
//           expiry_date: "",
//           supplier_id: "",
//         }}
//         onSubmit={handleAddProduct}
//       />
//     </div>
//   </div>
// )}


//       {/* ✏️ Edit Product Modal */}
//       {isEditModalOpen && editProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-2/3 max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Tahrirlash</h3>
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="text-red-600 font-bold text-xl"
//               >
//                 &times;
//               </button>
//             </div>
//             <Form
//               fields={[
//                 { name: "name", type: "text", required: true, label: "Mahsulot nomi" },
//                 { name: "manufacturer", type: "text", label: "Ishlab chiqaruvchi" },
//                 {
//                   name: "type",
//                   type: "select",
//                   label: "Dori shakli",
//                   options: Object.keys(sizeOptions).map((t) => ({
//                     value: t,
//                     label: t,
//                   })),
//                 },
//                 {
//                   name: "size",
//                   type: "select",
//                   label: "O‘lcham",
//                   options: (values) => sizeOptions[values.type] || [],
//                 },
//                 { name: "category", type: "text", label: "Toifa" },
//                 { name: "barcode", type: "text", label: "Barcode" },
//                 { name: "quantity", type: "number", label: "Miqdor" },
//                 { name: "price.retail", type: "number", required: true, label: "Chakana narx" },
//                 { name: "price.wholesale", type: "number", label: "Ulgurji narx" },
//                 { name: "price.purchase", type: "number", label: "Kirim narx" },
//                 { name: "expiry_date", type: "date", required: true, label: "Amal qilish muddati" },
//                 {
//                   name: "supplier_id",
//                   type: "select",
//                   options: suppliers.map((s) => ({ value: s._id, label: s.name })),
//                   label: "Yetkazib beruvchi",
//                 },
//               ]}
//               initialValues={{
//                 name: editProduct.name,
//                 manufacturer: editProduct.manufacturer || "",
//                 size: editProduct.size || "",
//                 type: editProduct.type || "",
//                 category: editProduct.category || "",
//                 barcode: editProduct.barcode,
//                 quantity: editProduct.quantity,
//                 "price.retail": editProduct.price?.retail || "",
//                 "price.wholesale": editProduct.price?.wholesale || "",
//                 "price.purchase": editProduct.price?.purchase || "",
//                 expiry_date: editProduct.expiry_date?.split("T")[0] || "",
//                 supplier_id: editProduct.supplier_id?._id || "",
//               }}
//               onSubmit={handleEditProduct}
//             />
//           </div>
//         </div>
//       )}

//       {/* 🔢 Quantity Update Modal */}
//       {isQuantityModalOpen && editProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-1/3">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Qoldiqni o‘zgartirish</h3>
//               <button
//                 onClick={() => setIsQuantityModalOpen(false)}
//                 className="text-red-600 font-bold text-xl"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="flex flex-col gap-4">
//               <label className="flex flex-col">
//                 Miqdor
//                 <input
//                   type="number"
//                   value={editProduct.quantity}
//                   onChange={(e) =>
//                     setEditProduct({ ...editProduct, quantity: e.target.value })
//                   }
//                   className="border px-4 py-2 rounded mt-1"
//                 />
//               </label>
//               <button
//                 onClick={handleQuantityUpdate}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Saqlash
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
   
//   );
// };

// export default Products;
