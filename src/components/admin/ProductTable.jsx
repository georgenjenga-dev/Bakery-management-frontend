import React from "react";
import "./ProductTable.css";

export default function ProductTable({
  products = [],
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
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="empty-state">
                <h3>No Products Found</h3>
                <p>
                  Products will appear here once they are fetched from the backend.
                </p>
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>

                <td>{product.id}</td>

                <td>{product.name}</td>

                <td>{product.category || "N/A"}</td>

                <td>
                  Ksh{" "}
                  {Number(product.price || 0).toLocaleString()}
                </td>

                <td>{product.stock ?? 0}</td>

                <td>
                  <span
                    className={
                      product.stock > 0
                        ? "status in-stock"
                        : "status out-stock"
                    }
                  >
                    {product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </td>

                <td className="actions">

                  <button
                    className="edit-btn"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(product)}
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