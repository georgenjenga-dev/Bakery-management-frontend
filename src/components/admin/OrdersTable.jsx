import React from "react";
import "./ProductTable.css";

export default function OrdersTable({
  orders = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="product-table-container">
      <table className="product-table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.length === 0 ? (

            <tr>
              <td colSpan={7} className="empty-state">
                <h3>No Orders Found</h3>
                <p>
                  Orders will appear here once connected to the backend.
                </p>
              </td>
            </tr>

          ) : (

            orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.product}</td>

                <td>{order.quantity}</td>

                <td>Ksh {Number(order.total).toLocaleString()}</td>

                <td>

                  <span
                    className={
                      order.status === "Completed"
                        ? "status in-stock"
                        : "status out-stock"
                    }
                  >
                    {order.status}
                  </span>

                </td>

                <td className="actions">

                  <button
                    className="edit-btn"
                    onClick={() => onEdit(order)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(order)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>
    </div>
  );
}