const db = require("../config/db");

// CREATE PURCHASE ORDER
const createPurchaseOrder = (req, res) => {
  const {
    supplier_id,
    product_id,
    quantity
  } = req.body;

  if (
    !supplier_id ||
    !product_id ||
    !quantity
  ) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const query = `
    INSERT INTO purchase_orders
    (
      supplier_id,
      product_id,
      quantity
    )
    VALUES (?, ?, ?)
  `;

  db.run(
    query,
    [
      supplier_id,
      product_id,
      quantity
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      res.status(201).json({
        message:
          "Purchase order created",
        orderId: this.lastID
      });
    }
  );
};


// GET PURCHASE ORDERS
const getPurchaseOrders = (
  req,
  res
) => {
  const query = `
    SELECT *
    FROM purchase_orders
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
  createPurchaseOrder,
  getPurchaseOrders,
};