import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AdminProducts.css";
import "../../components/admin/ProductTable.css";

export default function AdminSales() {
  const [sales] = useState([
    {
      id: 1,
      customer: "John Mwangi",
      product: "Chocolate Cake",
      quantity: 2,
      amount: 5000,
      date: "2026-07-30",
    },
    {
      id: 2,
      customer: "Mary Wanjiku",
      product: "Croissant",
      quantity: 6,
      amount: 1080,
      date: "2026-07-30",
    },
    {
      id: 3,
      customer: "David Otieno",
      product: "Vanilla Cupcake",
      quantity: 12,
      amount: 3600,
      date: "2026-07-29",
    },
    {
      id: 4,
      customer: "Grace Njeri",
      product: "Cookies",
      quantity: 8,
      amount: 1600,
      date: "2026-07-29",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSales = sales.filter((sale) => {
    const search = searchTerm.toLowerCase();

    return (
      sale.customer.toLowerCase().includes(search) ||
      sale.product.toLowerCase().includes(search) ||
      sale.id.toString().includes(search)
    );
  });

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.amount,
    0
  );

  const todaySales = sales
    .filter((sale) => sale.date === "2026-07-30")
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

        <section className="cards">

          <div className="card">
            <h2>Today's Sales</h2>
            <h3>Ksh {todaySales.toLocaleString()}</h3>
            <p>Total sales recorded today.</p>
          </div>

          <div className="card">
            <h2>This Week</h2>
            <h3>Ksh {totalRevenue.toLocaleString()}</h3>
            <p>Weekly sales summary.</p>
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
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

        <div className="product-table-container">

          <table className="product-table">

            <thead>

              <tr>
                <th>Sale ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {filteredSales.length === 0 ? (

                <tr>
                  <td colSpan="6" className="empty-state">
                    <h3>No Sales Found</h3>
                    <p>No matching sales records.</p>
                  </td>
                </tr>

              ) : (

                filteredSales.map((sale) => (

                  <tr key={sale.id}>

                    <td>{sale.id}</td>

                    <td>{sale.customer}</td>

                    <td>{sale.product}</td>

                    <td>{sale.quantity}</td>

                    <td>
                      Ksh {sale.amount.toLocaleString()}
                    </td>

                    <td>{sale.date}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}