import React from "react";
import "./DeleteModal.css";

export default function DeleteModal({
  product,
  onClose,
  onConfirm,
}) {
  if (!product) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">

        <h2>Delete Product</h2>

        <p>
          Are you sure you want to permanently delete
          <strong> {product.name}</strong>?
        </p>

        <p className="warning-text">
          This action cannot be undone.
        </p>

        <div className="delete-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}