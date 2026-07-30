import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import "./Dashboard.css";

export default function Dashboard() {
  const { admin, logout } = useAuth();

   return (
    <div className="dashboard">
       <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Sweet Crumbs</h2>
          <p>Admin Panel</p>
    </div>


        <nav className="sidebar-menu">
          <a href="#" className="active">Dashboard</a>
          <a href="#">Products</a>
          <a href="#">Inventory</a>
          <a href="#">Orders</a>
          <a href="#">Sales</a>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

       <main className="dashboard-content">

        <header className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, <strong>{admin?.username}</strong></p>
          </div>
        </header>

        <section className="stats-grid">

          <div className="stat-card">
            <h3>Total Products</h3>
            <h2>48</h2>
          </div>

          <div className="stat-card">
            <h3>Orders Today</h3>
            <h2>16</h2>
          </div>

          <div className="stat-card">
            <h3>Inventory Items</h3>
            <h2>123</h2>
          </div>

          <div className="stat-card">
            <h3>Today's Sales</h3>
            <h2>$1,240</h2>
          </div>

        </section>

         <section className="cards">

          <div className="card">
            <h2>Products</h2>
            <p>Add, edit and remove bakery products.</p>

            <button>Manage Products</button>
          </div>

          <div className="card">
            <h2>Inventory</h2>
            <p>Monitor ingredients and stock levels.</p>

            <button>View Inventory</button>
          </div>

          <div className="card">
            <h2>Orders</h2>
            <p>Track customer orders and update status.</p>

            <button>View Orders</button>
          </div>

          <div className="card">
            <h2>Sales</h2>
            <p>Review daily and monthly sales reports.</p>

            <button>View Sales</button>
          </div>

        </section>

      </main>

    </div>
  );
}
