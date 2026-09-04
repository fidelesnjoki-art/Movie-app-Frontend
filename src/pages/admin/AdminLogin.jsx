import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { backendApi } from "../../services/api";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    try {
      const data = await backendApi.login({ email, password });
      const user = data.user ?? {};
      const isAdmin = user.is_staff || user.is_superuser || user.role === "admin" || user.role === "superuser";
      if (!isAdmin) {
        setError("Access denied. Admin privileges required.");
        return;
      }
      dispatch(login(data));
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-[#f6b042] font-bold tracking-widest text-2xl mb-1">CINÉMA</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f6b042]/10 border border-[#f6b042]/20 text-[#f6b042] text-xs font-medium tracking-widest uppercase mb-4">
            Admin Portal
          </div>
          <h1 className="text-xl font-semibold text-white">Administrator Sign In</h1>
          <p className="text-gray-500 text-sm mt-1">Restricted access — admins only.</p>
        </div>

        {/* Card */}
        <div className="bg-white/3 border border-[#f6b042]/10 rounded-2xl p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="w-full px-4 py-2.5 rounded-md bg-white/5 border border-white/10 text-gray-100 focus:outline-none focus:border-[#f6b042]/60 focus:ring-1 focus:ring-[#f6b042]/30 transition-colors text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 pr-14 rounded-md bg-white/5 border border-white/10 text-gray-100 focus:outline-none focus:border-[#f6b042]/60 focus:ring-1 focus:ring-[#f6b042]/30 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="text-red-400 text-xs">⚠</span>
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] disabled:opacity-50 transition-colors mt-2"
            >
              {loading ? "Signing in…" : "Sign In to Admin"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Not an admin?{" "}
          <a href="/login" className="text-gray-400 hover:text-white transition-colors">
            Go to user login
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
