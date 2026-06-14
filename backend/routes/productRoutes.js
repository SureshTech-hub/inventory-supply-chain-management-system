const express = require("express");

const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// Only managers can create products
router.post(
  "/",
  verifyToken,
  allowRoles("manager"),
  createProduct
);


// All logged-in users can view products
router.get(
  "/",
  verifyToken,
  getProducts
);

module.exports = router;