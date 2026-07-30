import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AdminProducts.css";

export default function AdminInventory() {
  return (
    <AdminLayout title="Inventory Management">
      <div className="products-page">
        <div className="products-header">
          <div>
            <h1>Inventory</h1>
            <p>Monitor stock levels for all bakery products.</p>
          </div>

          <button className="add-btn">
            + Add Stock
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search inventory..."
          />
        </div>

        <div className="empty-state">
          <h3>No Inventory Available</h3>
          <p>
            Inventory information will appear here once connected to the backend.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}