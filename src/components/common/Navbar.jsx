import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0b0d]/90 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-[#f6b042] font-bold tracking-widest text-lg">
          CINÉMA
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/discover" className="text-gray-400 hover:text-white transition-colors">
            Discover
          </Link>
          <Link to="/clubs" className="text-gray-400 hover:text-white transition-colors">
            Clubs
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                {user?.name || user?.email || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-md bg-[#f6b042] text-black font-semibold hover:bg-[#e09a2e] transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
