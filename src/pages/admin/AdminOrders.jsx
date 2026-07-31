import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import OrdersTable from "../../components/admin/OrdersTable";
import OrderForm from "../../components/admin/OrderForm";
import DeleteModal from "../../components/admin/DeleteModal";
import "./AdminProducts.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1001,
      customer: "John Mwangi",
      product: "Chocolate Cake",
      quantity: 2,
      total: 5000,
      status: "Pending",
    },
    {
      id: 1002,
      customer: "Mary Wanjiku",
      product: "Croissant",
      quantity: 6,
      total: 1080,
      status: "Completed",
    },
    {
      id: 1003,
      customer: "David Otieno",
      product: "Cupcake",
      quantity: 12,
      total: 3600,
      status: "Processing",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    return (
      order.customer.toLowerCase().includes(search) ||
      order.product.toLowerCase().includes(search) ||
      order.status.toLowerCase().includes(search) ||
      order.id.toString().includes(search)
    );
  });

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDelete(true);
  };

  const handleSaveOrder = (orderData) => {
    setOrders(
      orders.map((order) =>
        order.id === editingOrder.id
          ? { ...order, ...orderData }
          : order
      )
    );

    setShowForm(false);
    setEditingOrder(null);
  };

  const confirmDelete = () => {
    setOrders(
      orders.filter(
        (order) => order.id !== selectedOrder.id
      )
    );

    setShowDelete(false);
    setSelectedOrder(null);
  };

  return (
    <AdminLayout title="Orders Management">

      <div className="products-page">

        <div className="products-header">

          <div>
            <h1>Orders Management</h1>
            <p>Manage customer orders.</p>
          </div>

        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <OrdersTable
          orders={filteredOrders}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <OrderForm
            order={editingOrder}
            onSave={handleSaveOrder}
            onClose={() => {
              setShowForm(false);
              setEditingOrder(null);
            }}
          />
        )}

        {showDelete && (
          <DeleteModal
            isOpen={showDelete}
            itemName={`Order #${selectedOrder?.id}`}
            onConfirm={confirmDelete}
            onClose={() => {
              setShowDelete(false);
              setSelectedOrder(null);
            }}
          />
        )}

      </div>

    </AdminLayout>
  );
}