import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			setError("Please fill in all fields.");
			return;
		}

		// Temporary mock register that logs user in
		const user = { name, email };
		dispatch(login(user));
		navigate("/");
	};

	return (
		<div className="auth-page">
			<div className="auth-container">

				<div className="auth-logo">CINÉMA</div>

				<h1>Create your account</h1>

				<p className="auth-subtitle">Join the movie community.</p>

				<form onSubmit={handleSubmit}>
					<label>Name</label>
					<input
						type="text"
						placeholder="Your name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<label>Email</label>
					<input
						type="email"
						placeholder="you@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label>Password</label>
					<input
						type="password"
						placeholder="Create a password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{error && <p className="auth-error">{error}</p>}

					<button type="submit" className="register-button">
						Sign Up
					</button>
				</form>

				<p className="login-text">
					Already have an account? {" "}
					<Link to="/login">Sign in</Link>
				</p>

			</div>
		</div>
		);
}

export default Register;
