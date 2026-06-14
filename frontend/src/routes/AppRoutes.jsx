import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Stock from "../pages/Stock";
import Warehouses from "../pages/Warehouses";
import ProtectedRoute from "../components/ProtectedRoute";
import PurchaseOrders from "../pages/PurchaseOrders";
import Analytics from "../pages/Analytics";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/register" element={<Register />} />
       <Route exact path="/" element={<Login />} />
      <Route exact path="/dashboard" element={ <ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
      <Route exact path="/products"  element={ <ProtectedRoute> <Products /> </ProtectedRoute>}/>
      <Route exact path="/stock" element={ <ProtectedRoute> <Stock /> </ProtectedRoute> } />
      <Route exact path="/warehouses" element={ <ProtectedRoute> <Warehouses /> </ProtectedRoute> }/>
      <Route exact path="/purchase-orders" element={ <ProtectedRoute> <PurchaseOrders /> </ProtectedRoute> }/>
      <Route exact path="/analytics"  element={ <ProtectedRoute> <Analytics /> </ProtectedRoute> }/>
    </Routes>
  );
}

export default AppRoutes;