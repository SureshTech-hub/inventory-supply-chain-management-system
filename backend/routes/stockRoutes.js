const express = require("express");

const {
  updateStock,
  getStockHistory,
} = require("../controllers/stockController");

const verifyToken =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  allowRoles("manager"),
  updateStock
);

router.get(
  "/history",
  verifyToken,
  getStockHistory
);

module.exports = router;