function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-2 justify-end mt-4">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1.5 rounded-md border border-white/10 text-gray-400 text-sm disabled:opacity-30 hover:border-white/30 hover:text-white transition-colors"
      >
        ← Prev
      </button>
      <span className="text-gray-500 text-sm">{page} / {totalPages}</span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1.5 rounded-md border border-white/10 text-gray-400 text-sm disabled:opacity-30 hover:border-white/30 hover:text-white transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
