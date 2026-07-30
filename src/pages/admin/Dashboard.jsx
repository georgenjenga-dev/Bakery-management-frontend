import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AdminLayout title="Admin Dashboard">

      <section className="stats-grid">

        <div
          className="stat-card"
          onClick={() => navigate("/admin/products")}
        >
          <h3>Total Products</h3>
          <h2>--</h2>
        </div>

        <div
          className="stat-card"
          onClick={() => navigate("/admin/orders")}
        >
          <h3>Orders Today</h3>
          <h2>--</h2>
        </div>

        <div
          className="stat-card"
          onClick={() => navigate("/admin/inventory")}
        >
          <h3>Inventory Items</h3>
          <h2>--</h2>
        </div>

        <div
          className="stat-card"
          onClick={() => navigate("/admin/sales")}
        >
          <h3>Today's Sales</h3>
          <h2>--</h2>
        </div>

      </section>

      <section className="cards">

        <div
          className="card"
          onClick={() => navigate("/admin/products")}
        >
          <h2>Products</h2>
          <p>Add, edit and remove bakery products.</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/admin/products");
            }}
          >
            Manage Products
          </button>
        </div>

        <div
          className="card"
          onClick={() => navigate("/admin/inventory")}
        >
          <h2>Inventory</h2>
          <p>Monitor ingredients and stock levels.</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/admin/inventory");
            }}
          >
            View Inventory
          </button>
        </div>

        <div
          className="card"
          onClick={() => navigate("/admin/orders")}
        >
          <h2>Orders</h2>
          <p>Track customer orders and update status.</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/admin/orders");
            }}
          >
            View Orders
          </button>
        </div>

        <div
          className="card"
          onClick={() => navigate("/admin/sales")}
        >
          <h2>Sales</h2>
          <p>Review daily and monthly sales reports.</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/admin/sales");
            }}
          >
            View Sales
          </button>
        </div>

      </section>

    </AdminLayout>
  );
}