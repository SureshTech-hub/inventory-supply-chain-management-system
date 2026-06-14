const db = require("../config/db");

// STOCK IN / OUT
const updateStock = (req, res) => {
  const {
    product_id,
    movement_type,
    quantity,
    warehouse_id
  } = req.body;

  // Validation
  if (
    !product_id ||
    !movement_type ||
    !quantity
  ) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const getProductQuery =
    "SELECT * FROM products WHERE id = ?";

  db.get(
    getProductQuery,
    [product_id],
    (err, product) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      let newQuantity = product.quantity;

      if (movement_type === "IN") {
        newQuantity += quantity;
      }

      if (movement_type === "OUT") {
        if (product.quantity < quantity) {
          return res.status(400).json({
            message:
              "Stock cannot go below zero"
          });
        }

        newQuantity -= quantity;
      }

      // Update product quantity
      db.run(
        `UPDATE products
         SET quantity = ?
         WHERE id = ?`,
        [newQuantity, product_id],
        (err) => {
          if (err) {
            return res.status(500).json({
              message: err.message
            });
          }

          // Save movement history
          db.run(
            `
            INSERT INTO stock_movements
            (
              product_id,
              movement_type,
              quantity,
              warehouse_id,
              created_by
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
              product_id,
              movement_type,
              quantity,
              warehouse_id,
              req.user.id
            ],
            (err) => {
              if (err) {
                return res.status(500).json({
                  message: err.message
                });
              }

              res.status(200).json({
                message:
                  "Stock updated successfully",
                currentStock:
                  newQuantity
              });
            }
          );
        }
      );
    }
  );
};

// GET MOVEMENT HISTORY
const getStockHistory = (req, res) => {
  const query = `
    SELECT *
    FROM stock_movements
    ORDER BY created_at DESC
  `;

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
  updateStock,
  getStockHistory,
};