function ConfirmModal({ title, message, onConfirm, onCancel, confirmLabel = "Confirm", danger = true }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={onCancel}>
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 w-full max-w-sm space-y-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        <p className="text-gray-400 text-sm">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-md border border-white/10 text-gray-300 hover:border-white/30 text-sm transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${danger ? "bg-red-600 hover:bg-red-700 text-white" : "bg-[#f6b042] hover:bg-[#e09a2e] text-black"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
