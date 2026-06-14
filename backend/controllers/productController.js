const db = require("../config/db");


// CREATE PRODUCT
const createProduct = (req, res) => {
  const { name, sku, quantity, warehouse_id, supplier_id } = req.body;

  // Validation
  if (!name || !sku) {
    return res.status(400).json({
      message: "Name and SKU are required",
    });
  }

  const query = `
    INSERT INTO products
    (name, sku, quantity, warehouse_id, supplier_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [name, sku, quantity || 0, warehouse_id, supplier_id],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Product created successfully",
        productId: this.lastID,
      });
    }
  );
};

// GET PRODUCTS
const getProducts = (req, res) => {
  const query = `SELECT * FROM products`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(200).json(rows);
  });
};


module.exports = {
  createProduct,
  getProducts,
};