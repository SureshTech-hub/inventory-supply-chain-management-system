import { useState } from "react";
import api from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      alert(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "manager",
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">
          Register
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>


          <div className="form-group">

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>


          <div className="form-group">

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>


          <div className="form-group">

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option value="manager">
                Manager
              </option>

              <option value="supplier">
                Supplier
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>


          <button type="submit">

            Register

          </button>

        </form>


        <div className="auth-footer">

          <p>

            Already have an account?

            <a href="/">
              Login
            </a>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;