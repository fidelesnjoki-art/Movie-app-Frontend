import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const isAdmin = user?.is_staff || user?.is_superuser || user?.role === "admin" || user?.role === "superuser";
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}

export default AdminRoute;
