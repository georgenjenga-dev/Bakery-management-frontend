import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";
import "./AdminLayout.css";

export default function AdminLayout({ title, children }) {
  const { admin } = useAuth();

  return (
    <div className="admin-layout">

      <Sidebar />

      <main className="admin-main">

        <header className="admin-header">

          <div>
            <h1>{title}</h1>
            <p>
              Welcome back,
              <strong> {admin?.username || "Administrator"}</strong>
            </p>
          </div>

        </header>

        <div className="admin-content">
          {children}
        </div>

      </main>

    </div>
  );
}