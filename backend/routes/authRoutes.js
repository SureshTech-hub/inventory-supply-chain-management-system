const express = require("express");

const {
  registerUser,
  loginUser,
  getSuppliers
} = require("../controllers/authController");

const verifyToken =
require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/suppliers",  verifyToken,  getSuppliers);

module.exports = router;