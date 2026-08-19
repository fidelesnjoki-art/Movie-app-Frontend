import React from "react";

function Button({ children, onClick, type = "button", className = "", ...props }) {
	return (
		<button type={type} onClick={onClick} className={`btn ${className}`.trim()} {...props}>
			{children}
		</button>
	);
}

export default Button;
