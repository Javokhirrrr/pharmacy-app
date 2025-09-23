// src/App.jsx
import React, { useState } from "react";

// 🔹 Sidebar komponenti
import Sidebar from "./components/Sidebar";

// 🔹 Sahifalar
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Clients from "./pages/Clients";
import ProductReceive from "./pages/ProductReceive";
import Categories from "./pages/Categories";       // ✅ Yangi
import MedicineTypes from "./pages/MedicineTypes"; // ✅ Yangi
import MedicineSizes from "./pages/MedicineSizes"; // ✅ Yangi
import Locations from "./pages/Locations";         // ✅ Yangi

const App = () => {
  // 🔹 Hozirgi faol sahifa
  const [activePage, setActivePage] = useState("Products");

  // 🔹 Sahifalarni render qilish funksiyasi
  const renderContent = () => {
    switch (activePage) {
      case "Products":
        return <Products />;
      case "Sales":
        return <Sales />;
      case "Suppliers":
        return <Suppliers />;
      case "Clients":
        return <Clients />;
      case "ProductReceive":
        return <ProductReceive />;
      case "Reports":
        return <Reports />;
      case "Categories":
        return <Categories />;
      case "MedicineTypes":
        return <MedicineTypes />;
      case "MedicineSizes":
        return <MedicineSizes />;
      case "Locations":
        return <Locations />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* 🔹 Chap menyu */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* 🔹 O‘ng kontent */}
      <div className="flex-1 p-6 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default App;
