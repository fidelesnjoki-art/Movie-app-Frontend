import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useSelector((s) => s.auth);

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <div className="text-5xl">🚫</div>
          <h1 className="text-2xl font-semibold text-white">Access Denied</h1>
          <p className="text-gray-400 text-sm">You do not have permission to view this page.</p>
          <a href="/" className="inline-block mt-4 px-4 py-2 rounded-md bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] transition-colors">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return children;
}

export default AdminRoute;
