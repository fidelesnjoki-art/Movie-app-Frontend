import { useState, useEffect } from "react";

function MovieSearch({ onSearch, onClear, initialValue = "" }) {
  const [input, setInput] = useState(initialValue);

  useEffect(() => { setInput(initialValue); }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
    else onClear?.();
  };

  const handleClear = () => {
    setInput("");
    onClear?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search movies, directors…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 transition-colors text-sm"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] transition-colors"
      >
        Search
      </button>
      {input && (
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-white transition-colors"
        >
          ✕
        </button>
      )}
    </form>
  );
}

export default MovieSearch;