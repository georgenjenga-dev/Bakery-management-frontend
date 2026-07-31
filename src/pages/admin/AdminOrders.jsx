import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import OrdersTable from "../../components/admin/OrdersTable";
import OrderForm from "../../components/admin/OrderForm";
import DeleteModal from "../../components/admin/DeleteModal";
import api from "../../api/axiosConfig";
import "./AdminProducts.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/orders/");
      const rawOrders = res.data?.orders || res.data?.data || res.data || [];
      const formatted = (Array.isArray(rawOrders) ? rawOrders : []).map((o) => ({
        ...o,
        customer: o.customer_name || o.customer || "Guest",
        product: o.items && o.items.length > 0 ? o.items.map((i) => i.product_name).join(", ") : o.product || "Bakery Items",
        quantity: o.items && o.items.length > 0 ? o.items.reduce((sum, i) => sum + i.quantity, 0) : o.quantity || 1,
        total: o.total_amount || o.total || 0,
        status: o.payment_status || o.status || "Pending"
      }));
      setOrders(formatted);
    } catch (err) {
      console.error("Failed to fetch admin orders:", err);
      setError("Unable to connect to live orders API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();
    return (
      (order.customer || "").toLowerCase().includes(search) ||
      (order.product || "").toLowerCase().includes(search) ||
      (order.status || "").toLowerCase().includes(search) ||
      (order.id || "").toString().includes(search)
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

  const handleSaveOrder = async (orderData) => {
    try {
      if (editingOrder) {
        await api.put(`/admin/orders/${editingOrder.id}/status`, {
          status: orderData.status || "Paid"
        });
        await fetchOrders();
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert(err.response?.data?.message || "Failed to update order status.");
    } finally {
      setShowForm(false);
      setEditingOrder(null);
    }
  };

  const confirmDelete = async () => {
    try {
      if (selectedOrder) {
        await api.put(`/admin/orders/${selectedOrder.id}/status`, { status: "Cancelled" });
        await fetchOrders();
      }
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert(err.response?.data?.message || "Failed to cancel order.");
    } finally {
      setShowDelete(false);
      setSelectedOrder(null);
    }
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

        {error && <div style={{ color: "#d9534f", marginBottom: "1rem" }}>{error}</div>}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>Loading orders...</div>
        ) : (
          <OrdersTable
            orders={filteredOrders}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

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