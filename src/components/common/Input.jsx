import React from "react";

function Input({ label, value, onChange, type = "text", placeholder = "", name, className = "", ...props }) {
	return (
		<div className={`input-wrapper ${className}`.trim()}>
			{label && <label className="input-label">{label}</label>}
			<input
				className="input-field"
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				{...props}
			/>
		</div>
	);
}

export default Input;
