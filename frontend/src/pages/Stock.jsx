import { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/Navbar";

function Stock() {
  const [formData, setFormData] = useState({
    product_id: "",
    movement_type: "IN",
    quantity: "",
    warehouse_id: "",
  });

  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchHistory = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
        "/stock/history",
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        setHistory(response.data);

    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/stock",
      {
        ...formData,
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity),
        warehouse_id: Number(formData.warehouse_id),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    setFormData({
      product_id: "",
      movement_type: "IN",
      quantity: "",
      warehouse_id: "",
    });

    fetchHistory();

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Stock update failed"
    );
  }
   };


  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="page-title">Stock Management</h1>

        <div className="card">

        <h2>Update Stock</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product ID</label>
            <input
              type="number"
              name="product_id"
              placeholder="Product ID"
              value={formData.product_id}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Movement Type</label>
            <select
            name="movement_type"
            value={formData.movement_type}
            onChange={handleChange}
          >
            <option value="IN">
              Stock IN
            </option>

            <option value="OUT">
              Stock OUT
            </option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Quantity</label>
            <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Warehouse ID</label>
            <input
            type="number"
            name="warehouse_id"
            placeholder="Warehouse ID"
            value={formData.warehouse_id}
            onChange={handleChange}
            />
          </div>
          
          <button type="submit">
            Update Stock
          </button>

        </form>

        </div>

        <div className="card">

          <h2>Stock Movement History</h2>

          <div className="table-container">

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Warehouse</th>
                </tr>
              </thead>

              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                        📊 No stock movements recorded yet.
                    </td>
                  </tr>
                ) : (
                  history.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.product_id}</td>
                      <td>{item.movement_type}</td>
                      <td>{item.quantity}</td>
                      <td>{item.warehouse_id}</td>
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

export default Stock;