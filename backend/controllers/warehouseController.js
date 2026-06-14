const db = require("../config/db");

// CREATE WAREHOUSE
const createWarehouse = (req, res) => {
  const { name, location } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Warehouse name is required",
    });
  }

  const query = `
    INSERT INTO warehouses (name, location)
    VALUES (?, ?)
  `;

  db.run(query, [name, location], function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(201).json({
      message: "Warehouse created successfully",
      warehouseId: this.lastID,
    });
  });
};

// GET ALL WAREHOUSES
const getWarehouses = (req, res) => {
  db.all(
    "SELECT * FROM warehouses",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(200).json(rows);
    }
  );
};

module.exports = {
  createWarehouse,
  getWarehouses,
};