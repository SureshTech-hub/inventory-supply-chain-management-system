const express = require("express");

const {
  createPurchaseOrder,
  getPurchaseOrders,
} = require("../controllers/purchaseController");

const verifyToken =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");

const router = express.Router();


// Managers create purchase orders
router.post(
  "/",
  verifyToken,
  allowRoles("manager"),
  createPurchaseOrder
);


// All authenticated users can view
router.get(
  "/",
  verifyToken,
  getPurchaseOrders
);

module.exports = router;