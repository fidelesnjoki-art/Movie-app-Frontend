import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Navabar() {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<Link to="/">CINÉMA</Link>
			</div>
			<div className="navbar-right">
				<Link to="/discover">Discover</Link>
				{isAuthenticated ? (
					<>
						<Link to="/profile">{user?.email || "Profile"}</Link>
						<button onClick={handleLogout} className="logout-button">
							Logout
						</button>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navabar;
