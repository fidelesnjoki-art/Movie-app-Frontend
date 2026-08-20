import { useState } from "react";

function MovieSearch({ onSearch, onClear, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  const handleClear = () => {
    setValue("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 transition-colors text-sm"
      />
      <button
        type="submit"
        className="px-4 py-2.5 rounded-xl bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] transition-colors"
      >
        Search
      </button>
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-white hover:border-white/25 transition-colors"
        >
          Clear
        </button>
      )}
    </form>
  );
}

export default MovieSearch;
