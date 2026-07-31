import React from "react";
import "./ProductTable.css";

export default function InventoryTable({
  inventory = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="product-table-container">
      <table className="product-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Minimum Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {inventory.length === 0 ? (

            <tr>
              <td colSpan={7} className="empty-state">
                <h3>No Inventory Found</h3>
                <p>
                  Inventory will appear here once connected to the backend.
                </p>
              </td>
            </tr>

          ) : (

            inventory.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.product}</td>

                <td>{item.category}</td>

                <td>{item.quantity}</td>

                <td>{item.minimum}</td>

                <td>

                  <span
                    className={
                      item.quantity > item.minimum
                        ? "status in-stock"
                        : "status out-stock"
                    }
                  >
                    {item.quantity > item.minimum
                      ? "In Stock"
                      : "Low Stock"}
                  </span>

                </td>

                <td className="actions">

                  <button
                    className="edit-btn"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(item)}
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