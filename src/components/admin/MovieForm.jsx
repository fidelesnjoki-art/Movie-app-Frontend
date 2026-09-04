import { useState } from "react";

const EMPTY = { title: "", media_type: "movie", overview: "", release_date: "", genre: "", is_featured: false };

function MovieForm({ initial = {}, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Title *</label>
          <input required value={form.title} onChange={(e) => set("title", e.target.value)}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-100 text-sm focus:outline-none focus:border-[#f6b042]/60" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Type</label>
          <select value={form.media_type} onChange={(e) => set("media_type", e.target.value)}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-[#f6b042]/60">
            <option value="movie">Movie</option>
            <option value="tv">TV Series</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Genre</label>
          <input value={form.genre} onChange={(e) => set("genre", e.target.value)}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-100 text-sm focus:outline-none focus:border-[#f6b042]/60" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Release Date</label>
          <input type="date" value={form.release_date} onChange={(e) => set("release_date", e.target.value)}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-100 text-sm focus:outline-none focus:border-[#f6b042]/60" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Overview</label>
        <textarea rows={3} value={form.overview} onChange={(e) => set("overview", e.target.value)}
          className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-100 text-sm focus:outline-none focus:border-[#f6b042]/60 resize-none" />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
        <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)}
          className="accent-[#f6b042]" />
        Featured
      </label>
      <div className="flex gap-3 justify-end pt-2">
        <button type="button" onClick={onCancel}
          className="px-4 py-2 rounded-md border border-white/10 text-gray-300 text-sm hover:border-white/30 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading}
          className="px-4 py-2 rounded-md bg-[#f6b042] text-black text-sm font-semibold hover:bg-[#e09a2e] disabled:opacity-50 transition-colors">
          {loading ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default MovieForm;
