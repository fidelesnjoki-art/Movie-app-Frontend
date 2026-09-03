import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { backendApi } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const tokens = await backendApi.login({ email, password });
      dispatch(login(tokens));
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      if (!user) {
        setError("Google sign-in was cancelled.");
        return;
      }
      // Register or login via backend using Google token
      const idToken = await user.getIdToken();
      try {
        const tokens = await backendApi.googleAuth(idToken);
        dispatch(login(tokens));
      } catch {
        // Fallback: register then login if googleAuth endpoint doesn't exist yet
        try {
          await backendApi.register({
            name: user.displayName || user.email.split("@")[0],
            email: user.email,
            password: idToken.slice(0, 20) + "Aa1!",
          });
        } catch {
          // user may already exist, continue to login
        }
        const tokens = await backendApi.login({
          email: user.email,
          password: idToken.slice(0, 20) + "Aa1!",
        });
        dispatch(login(tokens));
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/3 border border-white/8 rounded-2xl p-8 space-y-6">

        <div className="text-center">
          <div className="text-[#f6b042] font-bold tracking-widest text-xl mb-4">CINÉMA</div>
          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to continue your movie journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/60 focus:ring-1 focus:ring-[#f6b042]/30 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-16 rounded-md bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/60 focus:ring-1 focus:ring-[#f6b042]/30 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-[#f6b042] text-black font-semibold hover:bg-[#e09a2e] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Log In"}
          </button>
        </form>

        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <div className="flex-1 h-px bg-white/10" />
          <span>OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 rounded-md border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition-colors text-sm disabled:opacity-50"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#f6b042] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
