import { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/Navbar";

function Products() {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    warehouse_id: "",
    supplier_id: "",
  });

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

  const fetchProducts = async () => {

    setLoading(true);
    try {
        const token = localStorage.getItem("token");

        const response = await api.get(
        "/products",
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        setProducts(response.data);

    } catch (error) {
        console.error(error);
    } finally {
      setLoading(false);
    }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        await api.post(
        "/products",
        {
            ...formData,
            quantity: Number(formData.quantity),
            warehouse_id: Number(formData.warehouse_id),
            supplier_id: Number(formData.supplier_id),
        },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        alert("Product Created Successfully");

        setFormData({
        name: "",
        sku: "",
        quantity: "",
        warehouse_id: "",
        supplier_id: "",
        });

        fetchProducts();

    } catch (error) {
        alert(
        error.response?.data?.message ||
        "Failed to create product"
        );
    }
    };

  useEffect(() => {
    fetchProducts();
    }, []);

  return (
    <>
      <Navbar />
      
      <div className="container">
        <h1 className="page-title">Product Management</h1>

        <div className="card">

        <h2>Create Product</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>SKU</label>
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
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

          <button type="submit">
            Create Product
          </button>

        </form>
        </div>


        <div className="card">

          <h2>Products List</h2>

          {loading ? ( <p>Loading products...</p>) : (
          <div className="table-container">

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-state">
                        📦 No products found. Create your first product.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;