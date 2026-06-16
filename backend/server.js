const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./config/db");
require("./database/initDB");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/purchase-orders", purchaseRoutes);
app.use("/api/warehouses",  warehouseRoutes);
app.use("/api/analytics",  analyticsRoutes);



app.get("/", (req, res) => {
    res.send("Inventory Backend Running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});