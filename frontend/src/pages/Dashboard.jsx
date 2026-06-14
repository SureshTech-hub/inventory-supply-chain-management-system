import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
  totalProducts: 0,
  totalWarehouses: 0,
  totalOrders: 0,
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/analytics/dashboard",
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

    useEffect(() => {fetchStats();}, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container"> 
        <div className="card">
          <h1>👋 Welcome, {user?.name}</h1>
          <p>Logged in as: {user?.role}</p>
          <p>Inventory & Supply Chain Management System</p>
        </div>

        <div className="stats-grid">

          <div className="stat-card" onClick={() => navigate("/products")}>
            <h2>📦 Products</h2>
            <p>Manage Inventory</p>
          </div>

          <div className="stat-card" onClick={() => navigate("/stock")}>
            <h2>📊 Stock</h2>
            <p>Track Stock Movement</p>
          </div>

          <div className="stat-card" onClick={() => navigate("/warehouses")}>
            <h2>🏭 Warehouses</h2>
            <p>Manage Warehouses</p>
          </div>

          <div className="stat-card" onClick={() => navigate("/purchase-orders")}>
            <h2>📋 Purchase Orders</h2>
            <p>Purchase Orders</p>
          </div>

        </div>
    </div>

     
    </>
  );
}

export default Dashboard;