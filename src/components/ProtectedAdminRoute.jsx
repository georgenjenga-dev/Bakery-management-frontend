import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  return admin ? children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;