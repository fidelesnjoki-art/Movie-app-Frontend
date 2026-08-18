import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Temporary mock login.
    // We will replace this with the Flask API later.
    const user = {
      email,
    };

    dispatch(login(user));

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-logo">
          CINÉMA
        </div>

        <h1>Welcome back 👋</h1>

        <p className="auth-subtitle">
          Sign in to continue your movie journey.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button type="submit" className="login-button">
            Log In
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-button">
          Continue with Google
        </button>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;