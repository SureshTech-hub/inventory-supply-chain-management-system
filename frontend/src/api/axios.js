import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-backend-8z3l.onrender.com/api",
});

export default api;