import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Form from "../components/Form";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const columns = ["Product", "Customer", "Phone", "Email", "Quantity", "Price"];
  const apiUrl = "http://localhost:5000/api/sales";
  const productsUrl = "http://localhost:5000/api/products";

  // Fetch sales
  const fetchSales = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const formatted = data.map(s => ({
        Product: s.product_id?.name || "Noma’lum",
        Customer: s.customer_name,
        Phone: s.phone,
        Email: s.email,
        Quantity: s.quantity,
        Price: s.price,
        _id: s._id
      }));
      setSales(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch products for select input
  const fetchProducts = async () => {
    try {
      const res = await fetch(productsUrl);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const addSale = async (sale) => {
    if (!sale.Product) {
      alert("Iltimos, mahsulotni tanlang!");
      return;
    }

    const body = {
      product_id: sale.Product,
      customer_name: sale.Customer,
      phone: sale.Phone,
      email: sale.Email,
      quantity: Number(sale.Quantity),
      price: Number(sale.Price)
    };

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Xatolik: " + data.error);
        return;
      }
      fetchSales();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSale = async (id) => {
    const confirm = window.confirm("Rostdan ham sotuvni o‘chirmoqchimisiz?");
    if (!confirm) return;

    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      fetchSales();
    } catch (err) {
      console.error(err);
    }
  };

  const tableData = sales.map(s => ({
    ...s,
    Actions: (
      <button
        onClick={() => deleteSale(s._id)}
        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
      >
        O‘chirish
      </button>
    )
  }));

  const tableColumns = [...columns, "Actions"];

  // Form fields
  const formFields = columns.map(col => {
    if (col === "Product") {
      return {
        name: "Product",
        type: "select",
        options: products.map(p => ({ value: p._id, label: p.name }))
      };
    }
    return { name: col, type: "text" };
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sotuvlar</h2>
      <Form fields={formFields} onSubmit={addSale} />
      <Table columns={tableColumns} data={tableData} />
    </div>
  );
};

export default Sales;
