import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../api/axiosConfig";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: "--",
    totalOrders: "--",
    inventoryItems: "--",
    todaySales: "--"
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, statsRes] = await Promise.allSettled([
          api.get("/products"),
          api.get("/admin/orders/stats")
        ]);

        let productCount = "--";
        if (productsRes.status === "fulfilled") {
          const pData = productsRes.value.data?.data || productsRes.value.data;
          if (Array.isArray(pData)) productCount = pData.length;
        }

        let totalOrdersCount = "--";
        let revenue = "--";
        if (statsRes.status === "fulfilled") {
          const sData = statsRes.value.data?.stats;
          if (sData) {
            totalOrdersCount = sData.total_orders;
            revenue = `KSh ${Number(sData.total_revenue).toLocaleString()}`;
          }
        }

        setStats({
          totalProducts: productCount,
          totalOrders: totalOrdersCount,
          inventoryItems: productCount,
          todaySales: revenue
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout title="Admin Dashboard">

      <section className="stats-grid">

        <div
          className="stat-card"
          onClick={() => navigate("/admin/products")}
        >
          <h3>Total Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div
          className="stat-card"
          onClick={() => navigate("/admin/orders")}
        >
          <h3>Total Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div
          className="stat-card"
          onClick={() => navigate("/admin/inventory")}
        >
          <h3>Inventory Items</h3>
          <h2>{stats.inventoryItems}</h2>
        </div>

        <div
          className="stat-card"
          onClick={() => navigate("/admin/sales")}
        >
          <h3>Total Revenue</h3>
          <h2>{stats.todaySales}</h2>
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