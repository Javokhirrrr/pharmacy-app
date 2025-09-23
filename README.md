# 🏥 Apteka / Savdo Backend (Node.js + Express + MongoDB)

Bu loyiha **apteka va savdo tizimi** uchun backend API hisoblanadi.  
Unda mahsulotlar, mijozlar, yetkazib beruvchilar, sotuvlar, qarzdorliklar va boshqa modullar boshqariladi.

---

## 🚀 Texnologiyalar
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- REST API (CRUD)
- Postman orqali test qilish mumkin

---

## 📂 Modullar va Endpointlar

### 🔹 Products (Mahsulotlar)
- `GET    /api/products` → Barcha mahsulotlar
- `POST   /api/products` → Yangi mahsulot qo‘shish
- `GET    /api/products/:id` → Bitta mahsulot
- `PUT    /api/products/:id` → Mahsulotni yangilash
- `DELETE /api/products/:id` → Mahsulotni o‘chirish  

---

### 🔹 Suppliers (Yetkazib beruvchilar)
- `GET    /api/suppliers` → Barcha yetkazib beruvchilar
- `POST   /api/suppliers` → Yangi yetkazib beruvchi qo‘shish
- `GET    /api/suppliers/:id` → Bitta yetkazib beruvchi
- `PUT    /api/suppliers/:id` → Yetkazib beruvchini yangilash
- `DELETE /api/suppliers/:id` → Yetkazib beruvchini o‘chirish  

---

### 🔹 Clients (Mijozlar / Klinikalar)
- `GET    /api/clients` → Barcha mijozlar
- `POST   /api/clients` → Yangi mijoz qo‘shish
- `GET    /api/clients/:id` → Bitta mijoz
- `PUT    /api/clients/:id` → Mijozni yangilash
- `DELETE /api/clients/:id` → Mijozni o‘chirish  

---

### 🔹 Sales (Sotuvlar)
- `GET    /api/sales` → Barcha sotuvlar
- `POST   /api/sales` → Yangi sotuv qo‘shish
- `GET    /api/sales/:id` → Bitta sotuv
- `PUT    /api/sales/:id` → Sotuvni yangilash
- `DELETE /api/sales/:id` → Sotuvni o‘chirish  

---

### 🔹 SaleItems (Sotuv detallari)
- `GET    /api/sale-items` → Barcha sotuv detallari
- `POST   /api/sale-items` → Yangi sotuv detali qo‘shish
- `GET    /api/sale-items/:id` → Bitta detali
- `PUT    /api/sale-items/:id` → Sotuv detalini yangilash
- `DELETE /api/sale-items/:id` → Sotuv detalini o‘chirish  

---

### 🔹 Payments (To‘lovlar)
- `GET    /api/payments` → Barcha to‘lovlar
- `POST   /api/payments` → Yangi to‘lov qo‘shish
- `GET    /api/payments/:id` → Bitta to‘lov
- `PUT    /api/payments/:id` → To‘lovni yangilash
- `DELETE /api/payments/:id` → To‘lovni o‘chirish  

---

### 🔹 Deliveries (Yetkazib berish)
- `GET    /api/deliveries` → Barcha yetkazib berishlar
- `POST   /api/deliveries` → Yangi yetkazib berish qo‘shish
- `GET    /api/deliveries/:id` → Bitta yetkazib berish
- `PUT    /api/deliveries/:id` → Yetkazib berishni yangilash
- `DELETE /api/deliveries/:id` → Yetkazib berishni o‘chirish  

---

### 🔹 Stock_Movements (Ombor harakati)
- `GET    /api/stocks` → Barcha ombor harakatlari
- `POST   /api/stocks` → Yangi kirim/chiqim yozish
- `GET    /api/stocks/:id` → Bitta ombor yozuvi
- `DELETE /api/stocks/:id` → Yozuvni o‘chirish  

---

### 🔹 Expiration_Tracking (Amal qilish muddatini kuzatish)
- `GET    /api/expirations` → Barcha yozuvlar
- `POST   /api/expirations` → Yangi kuzatuv yozuvi
- `GET    /api/expirations/:id` → Bitta yozuv
- `PUT    /api/expirations/:id` → Statusni yangilash
- `DELETE /api/expirations/:id` → Yozuvni o‘chirish  

---

### 🔹 Debts (Qarzdorliklar)
- `GET    /api/debts` → Barcha qarzdorliklar
- `POST   /api/debts` → Yangi qarzdorlik qo‘shish
- `GET    /api/debts/:id` → Bitta qarz
- `PUT    /api/debts/:id/pay` → Qarzni yopish (to‘langan)
- `DELETE /api/debts/:id` → Qarzni o‘chirish  

---

## ⚡ Ishga tushirish
```bash
# 1. Kutubxonalarni o‘rnatish
npm install

# 2. Serverni ishga tushirish
npm run dev
# my-pharmacy-app
