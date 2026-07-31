import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import InventoryTable from "../../components/admin/InventoryTable";
import StockForm from "../../components/admin/StockForm";
import DeleteModal from "../../components/admin/DeleteModal";
import "./AdminProducts.css";

export default function AdminInventory() {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      product: "Chocolate Cake",
      category: "Cake",
      quantity: 15,
      minimum: 5,
    },
    {
      id: 2,
      product: "Croissant",
      category: "Pastry",
      quantity: 8,
      minimum: 10,
    },
    {
      id: 3,
      product: "Cookies",
      category: "Snacks",
      quantity: 30,
      minimum: 12,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredInventory = inventory.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSave = (data) => {
    if (editingItem) {
      setInventory(
        inventory.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...data }
            : item
        )
      );
    } else {
      setInventory([
        ...inventory,
        {
          id: Date.now(),
          ...data,
        },
      ]);
    }

    setShowForm(false);
    setEditingItem(null);
  };

  const confirmDelete = () => {
    setInventory(
      inventory.filter(
        (item) => item.id !== selectedItem.id
      )
    );

    setShowDelete(false);
    setSelectedItem(null);
  };

  return (
    <AdminLayout title="Inventory Management">

      <div className="products-page">

        <div className="products-header">

          <div>
            <h1>Inventory Management</h1>
            <p>
              Monitor and update stock levels.
            </p>
          </div>

          <button
            className="add-btn"
            onClick={handleAddStock}
          >
            + Add Stock
          </button>

        </div>

        <div className="search-container">

          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

        <InventoryTable
          inventory={filteredInventory}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

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