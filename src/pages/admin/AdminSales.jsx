import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../api/axiosConfig";
import "./AdminProducts.css";
import "../../components/admin/ProductTable.css";

export default function AdminSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/orders/");
        const rawOrders = res.data?.orders || res.data?.data || res.data || [];
        const formattedSales = (Array.isArray(rawOrders) ? rawOrders : []).map((o) => ({
          id: o.id,
          customer: o.customer_name || "Guest",
          product: o.items && o.items.length > 0 ? o.items.map((i) => i.product_name).join(", ") : "Bakery Items",
          quantity: o.items && o.items.length > 0 ? o.items.reduce((sum, i) => sum + i.quantity, 0) : 1,
          amount: Number(o.total_amount || 0),
          date: o.created_at ? o.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
          status: o.payment_status || "Pending"
        }));
        setSales(formattedSales);
      } catch (err) {
        console.error("Failed to fetch sales data:", err);
        setError("Unable to connect to live sales API.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const filteredSales = sales.filter((sale) => {
    const search = searchTerm.toLowerCase();
    return (
      (sale.customer || "").toLowerCase().includes(search) ||
      (sale.product || "").toLowerCase().includes(search) ||
      (sale.id || "").toString().includes(search)
    );
  });

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const todayStr = new Date().toISOString().split("T")[0];
  const todaySales = sales
    .filter((sale) => sale.date === todayStr)
    .reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <AdminLayout title="Sales Reports">

      <div className="products-page">

        <div className="products-header">
          <div>
            <h1>Sales Reports</h1>
            <p>Track bakery sales performance.</p>
          </div>
        </div>

        {error && <div style={{ color: "#d9534f", marginBottom: "1rem" }}>{error}</div>}

        <section className="cards">

          <div className="card">
            <h2>Today's Sales</h2>
            <h3>Ksh {todaySales.toLocaleString()}</h3>
            <p>Total sales recorded today.</p>
          </div>

          <div className="card">
            <h2>Total Orders</h2>
            <h3>{sales.length}</h3>
            <p>Count of all recorded orders.</p>
          </div>

          <div className="card">
            <h2>This Month</h2>
            <h3>Ksh {totalRevenue.toLocaleString()}</h3>
            <p>Monthly sales summary.</p>
          </div>

          <div className="card">
            <h2>Total Revenue</h2>
            <h3>Ksh {totalRevenue.toLocaleString()}</h3>
            <p>Total revenue generated.</p>
          </div>

        </section>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by customer or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="product-table-container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>Loading sales reports...</div>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Sale ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      <h3>No Sales Found</h3>
                      <p>No matching sales records.</p>
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>#{sale.id}</td>
                      <td>{sale.customer}</td>
                      <td>{sale.product}</td>
                      <td>{sale.quantity}</td>
                      <td>Ksh {sale.amount.toLocaleString()}</td>
                      <td>{sale.date}</td>
                      <td>
                        <span className={sale.status === "Paid" ? "status in-stock" : "status out-stock"}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </AdminLayout>
  );
}