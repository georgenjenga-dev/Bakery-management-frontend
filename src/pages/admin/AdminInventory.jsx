import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import InventoryTable from "../../components/admin/InventoryTable";
import StockForm from "../../components/admin/StockForm";
import DeleteModal from "../../components/admin/DeleteModal";
import api from "../../api/axiosConfig";
import "./AdminProducts.css";

export default function AdminInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      const rawProducts = res.data?.data || res.data || [];
      const items = (Array.isArray(rawProducts) ? rawProducts : []).map((p) => ({
        id: p.id,
        product: p.name,
        category: p.category || "General",
        quantity: p.stock || 0,
        minimum: 5,
        price: p.price,
        image: p.image,
        description: p.description
      }));
      setInventory(items);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
      setError("Unable to connect to live inventory API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter((item) =>
    (item.product || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStock = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDelete(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingItem) {
        await api.put(`/products/${editingItem.id}`, {
          name: editingItem.product,
          price: editingItem.price || 100,
          stock: parseInt(data.quantity, 10),
          category: editingItem.category || "General",
          image: editingItem.image || "",
          description: editingItem.description || ""
        });
        await fetchInventory();
      }
    } catch (err) {
      console.error("Failed to update stock:", err);
      alert("Failed to update stock level.");
    } finally {
      setShowForm(false);
      setEditingItem(null);
    }
  };

  const confirmDelete = async () => {
    try {
      if (selectedItem) {
        await api.delete(`/products/${selectedItem.id}`);
        await fetchInventory();
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item.");
    } finally {
      setShowDelete(false);
      setSelectedItem(null);
    }
  };

  return (
    <AdminLayout title="Inventory Management">

      <div className="products-page">

        <div className="products-header">
          <div>
            <h1>Inventory Management</h1>
            <p>Monitor and update stock levels.</p>
          </div>

          <button
            className="add-btn"
            onClick={handleAddStock}
          >
            + Add Stock
          </button>
        </div>

        {error && <div style={{ color: "#d9534f", marginBottom: "1rem" }}>{error}</div>}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>Loading inventory stock...</div>
        ) : (
          <InventoryTable
            inventory={filteredInventory}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {showForm && (
          <StockForm
            item={editingItem}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
          />
        )}

        {showDelete && (
          <DeleteModal
            isOpen={showDelete}
            itemName={selectedItem?.product}
            onConfirm={confirmDelete}
            onClose={() => {
              setShowDelete(false);
              setSelectedItem(null);
            }}
          />
        )}

      </div>

    </AdminLayout>
  );
}