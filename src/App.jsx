import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedAdminRoute";
import AdminEntry from "./components/AdminEntry";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  
  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={<AdminEntry />} />
        <Route path="/admin/login" element={<Login />} />

  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>
 
      {!isAdminPage &&<Footer />}
    </>
  );
}

export default App;