function Input({ label, value, onChange, type = "text", placeholder = "", name, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm text-gray-400 font-medium">{label}</label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-md bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/60 focus:ring-1 focus:ring-[#f6b042]/30 transition-colors"
        {...props}
      />
    </div>
  );
}

export default Input;
