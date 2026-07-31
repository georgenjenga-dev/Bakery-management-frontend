import React, { useEffect, useState } from "react";
import "./StockForm.css";

export default function StockForm({
  item,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    product: "",
    category: "",
    quantity: "",
    minimum: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        product: item.product || "",
        category: item.category || "",
        quantity: item.quantity || 0,
        minimum: item.minimum || 0,
      });
    } else {
      setFormData({
        product: "",
        category: "",
        quantity: "",
        minimum: "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "minimum"
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
            {item ? "Edit Stock" : "Add Stock"}
          </h2>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <label>Product Name</label>

          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />

          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Cake, Bread, Pastry..."
          />

          <label>Current Quantity</label>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label>Minimum Stock Level</label>

          <input
            type="number"
            name="minimum"
            value={formData.minimum}
            onChange={handleChange}
            required
          />

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
              {item ? "Update Stock" : "Add Stock"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}