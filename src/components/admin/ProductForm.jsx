import React, { useEffect, useState } from "react";
import "./ProductForm.css";

export default function ProductForm({
  product,
  onSave,
  onClose,
}) {
  const emptyForm = {
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    setFormData(emptyForm);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>
            {product ? "Edit Product" : "Add Product"}
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Cake, Bread, Pastry"
          />

          <label>Price (Ksh)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />

          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Available quantity"
            required
          />

          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image URL"
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
              {product ? "Update Product" : "Add Product"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}