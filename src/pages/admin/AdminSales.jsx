import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AdminProducts.css";

export default function AdminSales() {
  return (
    <AdminLayout title="Sales Reports">
      <div className="products-page">
        <div className="products-header">
          <div>
            <h1>Sales Reports</h1>
            <p>Track bakery sales performance.</p>
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <h2>Today's Sales</h2>
            <h3>Ksh --</h3>
            <p>Waiting for backend data.</p>
          </div>

          <div className="card">
            <h2>This Week</h2>
            <h3>Ksh --</h3>
            <p>Waiting for backend data.</p>
          </div>

          <div className="card">
            <h2>This Month</h2>
            <h3>Ksh --</h3>
            <p>Waiting for backend data.</p>
          </div>

          <div className="card">
            <h2>Total Revenue</h2>
            <h3>Ksh --</h3>
            <p>Waiting for backend data.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}