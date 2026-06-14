const express = require("express");

const {
  getLowStockProducts,
  getDashboardStats,
} = require("../controllers/analyticsController");

const verifyToken =
  require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/low-stock",
  verifyToken,
  getLowStockProducts
);

router.get(
  "/dashboard",
  verifyToken,
  getDashboardStats
);

module.exports = router;