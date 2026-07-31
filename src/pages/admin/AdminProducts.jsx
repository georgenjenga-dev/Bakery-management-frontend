import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import ProductForm from "../../components/admin/ProductForm";
import DeleteModal from "../../components/admin/DeleteModal";
import api from "../../api/axiosConfig";
import "./AdminProducts.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      const rawData = res.data?.data || res.data;
      setProducts(Array.isArray(rawData) ? rawData : []);
    } catch (err) {
      console.error("Error fetching admin products:", err);
      setError("Failed to fetch products from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      (product.name || "").toLowerCase().includes(search) ||
      (product.category || "").toLowerCase().includes(search) ||
      (product.price || "").toString().includes(search) ||
      (product.stock || "").toString().includes(search) ||
      (product.id || "").toString().includes(search)
    );
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDelete(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      const payload = {
        name: productData.name,
        description: productData.description || "",
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock, 10),
        category: productData.category || "General",
        image: productData.image || ""
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      await fetchProducts();
    } catch (err) {
      console.error("Failed to save product:", err);
      alert(err.response?.data?.message || err.response?.data?.error || "Failed to save product.");
    } finally {
      setShowForm(false);
      setEditingProduct(null);
    }
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await api.delete(`/products/${selectedProduct.id}`);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert(err.response?.data?.message || "Failed to delete product.");
    } finally {
      setShowDelete(false);
      setSelectedProduct(null);
    }
  };

  return (
    <AdminLayout title="Products Management">

      <div className="products-header">
        <div>
          <h1>Products Management</h1>
          <p>Create, edit and remove bakery products.</p>
        </div>

        <button
          className="add-btn"
          onClick={handleAddProduct}
        >
          + Add Product
        </button>
      </div>

      {error && <div style={{ color: "#d9534f", marginBottom: "1rem" }}>{error}</div>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID, name, category, price or stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>Loading products...</div>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {showDelete && (
        <DeleteModal
          isOpen={showDelete}
          itemName={selectedProduct?.name}
          onConfirm={confirmDelete}
          onClose={() => {
            setShowDelete(false);
            setSelectedProduct(null);
          }}
        />
      )}

    </AdminLayout>
  );
}