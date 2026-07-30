import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../context/cartcontext';
import "./Navbar.css";

function Navbar() {
  const { admin, logout } = useAuth();
  const { totalItems } = useCart();
  
  return (
    <header className="navbar">
      <div className="logo">
        <h2> Sweet Crumbs Bakery</h2>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="cart-link">
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
        <Link to="/orders">Orders</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Navbar;