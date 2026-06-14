import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        📦 InventoryPro
      </div>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰ Menu
      </button>

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/products">Products</Link>

        <Link to="/stock">Stock</Link>

        <Link to="/warehouses">Warehouses</Link>

        <Link to="/purchase-orders">
          Orders
        </Link>

        <Link to="/analytics">Analytics</Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;