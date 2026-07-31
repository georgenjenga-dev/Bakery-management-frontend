import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>Sweet Delicacy</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/admin/inventory"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Inventory
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/admin/sales"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Sales
        </NavLink>

      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </aside>
  );
}