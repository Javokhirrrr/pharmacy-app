// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ activePage, setActivePage }) => {
  const menu = [
    { name: "Products", label: "Mahsulotlar" },
    { name: "Sales", label: "Sotuvlar" },
    { name: "Suppliers", label: "Yetkazib beruvchilar" },
    { name: "Clients", label: "Mijozlar" },
    { name: "ProductReceive", label: "Mahsulot qabul qilish" },
    { name: "Reports", label: "Hisobotlar" },
    { name: "Categories", label: "Kategoriyalar" },
    { name: "MedicineTypes", label: "Dori shakllari" },
    { name: "MedicineSizes", label: "Dori o‘lchamlari" },
    { name: "Locations", label: "Ombor joylashuvlari" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col sticky top-0 h-screen">
      <h1 className="text-2xl font-bold p-6 border-b border-gray-700">
        Admin Panel
      </h1>
      <nav className="flex-1 flex flex-col">
        <ul>
          {menu.map((item) => (
            <li
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`px-6 py-3 cursor-pointer hover:bg-gray-700 ${
                activePage === item.name ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
