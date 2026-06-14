const express = require("express");

const {
  createWarehouse,
  getWarehouses,
} = require("../controllers/warehouseController");

const verifyToken =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  allowRoles("manager"),
  createWarehouse
);

router.get(
  "/",
  verifyToken,
  getWarehouses
);

module.exports = router;