const COLORS = {
  active:    "bg-green-500/15 text-green-400 border-green-500/20",
  inactive:  "bg-gray-500/15 text-gray-400 border-gray-500/20",
  suspended: "bg-red-500/15 text-red-400 border-red-500/20",
  visible:   "bg-green-500/15 text-green-400 border-green-500/20",
  hidden:    "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  removed:   "bg-red-500/15 text-red-400 border-red-500/20",
  pending:   "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  reviewed:  "bg-blue-500/15 text-blue-400 border-blue-500/20",
  resolved:  "bg-green-500/15 text-green-400 border-green-500/20",
  dismissed: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  featured:  "bg-[#f6b042]/15 text-[#f6b042] border-[#f6b042]/20",
};

function StatusBadge({ status }) {
  const key = (status ?? "").toLowerCase();
  return (
    <span className={`px-2 py-0.5 rounded-full border text-xs font-medium capitalize ${COLORS[key] ?? "bg-white/5 text-gray-400 border-white/10"}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
