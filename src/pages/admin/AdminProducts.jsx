import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import ProductForm from "../../components/admin/ProductForm";
import DeleteModal from "../../components/admin/DeleteModal";
import "./AdminProducts.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Chocolate Cake",
      category: "Cake",
      price: 2500,
      stock: 12,
    },
    {
      id: 2,
      name: "Vanilla Cupcake",
      category: "Cupcake",
      price: 300,
      stock: 20,
    },
    {
      id: 3,
      name: "Croissant",
      category: "Pastry",
      price: 180,
      stock: 0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.price.toString().includes(search) ||
      product.stock.toString().includes(search) ||
      product.id.toString().includes(search)
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

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...productData }
            : product
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...productData,
      };

      setProducts([...products, newProduct]);
    }

    setShowForm(false);
    setEditingProduct(null);
  };

  const confirmDelete = () => {
    setProducts(
      products.filter(
        (product) => product.id !== selectedProduct.id
      )
    );

    setShowDelete(false);
    setSelectedProduct(null);
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

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID, name, category, price or stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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