import { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/Navbar";

function PurchaseOrders() {
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    supplier_id: "",
    product_id: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/purchase-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/purchase-orders",
        {
          supplier_id: Number(
            formData.supplier_id
          ),
          product_id: Number(
            formData.product_id
          ),
          quantity: Number(
            formData.quantity
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setFormData({
        supplier_id: "",
        product_id: "",
        quantity: "",
      });

      fetchOrders();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create order"
      );
    }
  };

  return (
    <>
      <Navbar /> 
      
      <div className="container">
        <h1 className="page-title">Purchase Orders</h1>

        <div className="card"> 
          <h2>Create Purchase Order</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Supplier ID</label>
              <input
              type="number"
              name="supplier_id"
              placeholder="Supplier ID"
              value={formData.supplier_id}
              onChange={handleChange}
              />
            </div>
            
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
              <label>Quantity</label>
              <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              />
            </div>
            
            <button type="submit">
              Create Order
            </button>
          </form>
        </div>

        <div className="card">

          <h2>Purchase Orders List</h2>

          <div className="table-container">

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Supplier</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                       📋 No purchase orders created yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.supplier_id}</td>
                      <td>{order.product_id}</td>
                      <td>{order.quantity}</td>
                      <td>
                        <span className={order.status === "pending" ? "status-pending" : "status-completed"}>{order.status}</span>
                      </td>
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

export default PurchaseOrders;