const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Check existing user
  const checkUserQuery = `SELECT * FROM users WHERE email = ?`;

  db.get(checkUserQuery, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    db.run(
      insertQuery,
      [name, email, hashedPassword, role],
      function (err) {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        res.status(201).json({
          message: "User registered successfully",
        });
      }
    );
  });
};


// LOGIN USER
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};


// Supplier List 

const getSuppliers = (req, res) => {
  const query =
    "SELECT id,name,email FROM users WHERE role='supplier'";

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json(rows);
  });
};

module.exports = {
  registerUser,
  loginUser,
  getSuppliers,
};