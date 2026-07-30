import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AdminProducts.css";

export default function AdminOrders() {
  return (
    <AdminLayout title="Orders Management">
      <div className="products-page">
        <div className="products-header">
          <div>
            <h1>Orders</h1>
            <p>Manage customer orders.</p>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search orders..."
          />
        </div>

        <div className="empty-state">
          <h3>No Orders Found</h3>
          <p>
            Customer orders will appear here after the backend is connected.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}