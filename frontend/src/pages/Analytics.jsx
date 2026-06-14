import { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/Navbar";

function Analytics() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalWarehouses: 0,
    totalOrders: 0,
  });

  const [lowStock, setLowStock] = useState([]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/analytics/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchLowStock = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/analytics/low-stock",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLowStock(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchLowStock();
  }, []);

  return (
    <>
      <Navbar /> 
    
      <div className="container">

        <h1 className="page-title">Analytics Dashboard</h1>

        <div className="stats-grid">

          <div className="stat-card">
            <h2>📦 {stats.totalProducts}</h2>
            <p>Total Products</p>
          </div>

          <div className="stat-card">
            <h2>🏭 {stats.totalWarehouses}</h2>
            <p>Total Warehouses</p>
          </div>

          <div className="stat-card">
            <h2>📋 {stats.totalOrders}</h2>
            <p>Total Orders</p>
          </div>

        </div>

        <div className="card analytics-table-card">

            <h2>⚠️ Low Stock Alerts</h2>

          <div className="table-container">

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>

              <tbody>
                {lowStock.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-state">
                        ✅ No low stock products found
                    </td>
                  </tr>
                ) : (
                  lowStock.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td><span className="low-stock-badge">{product.quantity}</span></td>
                      </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;