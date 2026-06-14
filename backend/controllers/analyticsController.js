const db = require("../config/db");

// LOW STOCK PRODUCTS
const getLowStockProducts = (req, res) => {
  const query = `
    SELECT *
    FROM products
    WHERE quantity < 10
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(200).json(rows);
  });
};

// DASHBOARD STATS
const getDashboardStats = (req, res) => {
  const stats = {};

  db.get(
    "SELECT COUNT(*) as totalProducts FROM products",
    [],
    (err, products) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      stats.totalProducts =
        products.totalProducts;

      db.get(
        "SELECT COUNT(*) as totalWarehouses FROM warehouses",
        [],
        (err, warehouses) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          stats.totalWarehouses =
            warehouses.totalWarehouses;

          db.get(
            "SELECT COUNT(*) as totalOrders FROM purchase_orders",
            [],
            (err, orders) => {
              if (err) {
                return res.status(500).json({
                  message: err.message,
                });
              }

              stats.totalOrders =
                orders.totalOrders;

              res.status(200).json(stats);
            }
          );
        }
      );
    }
  );
};

module.exports = {
  getLowStockProducts,
  getDashboardStats,
};