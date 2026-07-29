import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <h2> Sweet Crumbs Bakery</h2>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;