import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { backendApi } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    try {
      await backendApi.register({ name, email, password });
      const tokens = await backendApi.login({ email, password });
      dispatch(login({ user: { name, email }, ...tokens }));
      navigate("/");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-md bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/60 focus:ring-1 focus:ring-[#f6b042]/30 transition-colors";

  return (
    <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/3 border border-white/8 rounded-2xl p-8 space-y-6">

        <div className="text-center">
          <div className="text-[#f6b042] font-bold tracking-widest text-xl mb-4">CINÉMA</div>
          <h1 className="text-2xl font-semibold text-white">Create your account</h1>
          <p className="text-gray-400 text-sm mt-1">Join the movie community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#f6b042] text-black font-semibold hover:bg-[#e09a2e] transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#f6b042] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
