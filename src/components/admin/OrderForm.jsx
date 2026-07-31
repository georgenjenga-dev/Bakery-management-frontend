import React, { useEffect, useState } from "react";
import "./ProductForm.css";

export default function OrderForm({
  order,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    quantity: "",
    total: "",
    status: "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customer: order.customer || "",
        product: order.product || "",
        quantity: order.quantity || "",
        total: order.total || "",
        status: order.status || "",
      });
    } else {
      setFormData({
        customer: "",
        product: "",
        quantity: "",
        total: "",
        status: "Pending",
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "total"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>
            {order ? "Edit Order" : "New Order"}
          </h2>

          <button
            className="close-btn"
            type="button"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <label>Customer Name</label>

          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />

          <label>Product</label>

          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          />

          <label>Quantity</label>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label>Total (Ksh)</label>

          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            required
          />

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {order ? "Update Order" : "Save Order"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}