import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminEntry() {
  const { admin, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  return admin
    ? <Navigate to="/admin/dashboard" replace />
    : <Navigate to="/admin/login" replace />;
}

export default AdminEntry;