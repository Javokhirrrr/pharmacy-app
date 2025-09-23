const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB ulandi"))
.catch((err) => console.error("❌ Mongo xato:", err));

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/sales", require("./routes/saleRoutes"));
app.use("/api/sale-items", require("./routes/saleItemRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/deliveries", require("./routes/deliveryRoutes"));
app.use("/api/stocks", require("./routes/stockRoutes"));
app.use("/api/expirations", require("./routes/expirationRoutes"));
app.use("/api/debts", require("./routes/debtRoutes"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/locations", require("./routes/routesLocation"));
app.use("/api/sizes", require("./routes/routesMedicineSize"));
app.use("/api/types", require("./routes/routesMedicineType"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ishga tushdi: ${PORT}`));
