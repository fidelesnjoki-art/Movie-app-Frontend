function AdminSearchBar({ value, onChange, placeholder = "Search…" }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/60 focus:ring-1 focus:ring-[#f6b042]/30 transition-colors text-sm w-full sm:w-64"
    />
  );
}

export default AdminSearchBar;
