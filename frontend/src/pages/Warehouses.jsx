import { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/Navbar";

function Warehouses() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const [warehouses, setWarehouses] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchWarehouses = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/warehouses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setWarehouses(response.data);

  } catch (error) {
    console.error(error);
  }
  };

  useEffect(() => { fetchWarehouses(); }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/warehouses",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    setFormData({
      name: "",
      location: "",
    });

    fetchWarehouses();

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to create warehouse"
    );
  }
  };

  return (
    <>
      <Navbar />
      
      <div className="container">
        
        <h1 className="page-title">Warehouse Management</h1>

        <div className="card">
          <h2>Create Warehouse</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Warehouse Name</label>
              <input
              type="text"
              name="name"
              placeholder="Warehouse Name"
              value={formData.name}
              onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              />
            </div>

            <button type="submit">
              Create Warehouse
            </button>

          </form>
        </div>

        <div className="card">

          <h2>Warehouse List</h2>

          <div className="table-container">

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {warehouses.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-state">
                        🏭 No warehouses available.
                    </td>
                  </tr>
                ) : (
                  warehouses.map((warehouse) => (
                    <tr key={warehouse.id}>
                      <td>{warehouse.id}</td>
                      <td>{warehouse.name}</td>
                      <td>{warehouse.location}</td>
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

export default Warehouses;