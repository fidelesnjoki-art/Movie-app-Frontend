const variants = {
  primary: "bg-[#f6b042] text-black font-semibold hover:bg-[#e09a2e]",
  secondary: "border border-white/20 text-gray-300 hover:border-white/40 hover:text-white",
  ghost: "text-gray-400 hover:text-white",
};

function Button({ children, onClick, type = "button", variant = "primary", className = "", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
