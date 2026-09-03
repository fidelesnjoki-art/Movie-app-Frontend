import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminReports, updateAdminReport } from "../../features/admin/adminSlice";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import Pagination from "../../components/admin/Pagination";
import ConfirmModal from "../../components/admin/ConfirmModal";

const PAGE_SIZE = 20;

function ReportDetailModal({ report: rep, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">Report Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>
        {[
          ["ID", rep.id],
          ["Type", rep.target_type ?? "—"],
          ["Reason", rep.reason],
          ["Description", rep.description || "—"],
          ["Reporter", rep.reported_by ?? "—"],
          ["Resolved By", rep.resolved_by ?? "—"],
          ["Status", <StatusBadge key="s" status={rep.status?.toLowerCase()} />],
          ["Date", rep.created_at ? new Date(rep.created_at).toLocaleDateString() : "—"],
          ["Resolved At", rep.resolved_at ? new Date(rep.resolved_at).toLocaleDateString() : "—"],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-sm border-b border-white/5 pb-2">
            <span className="text-gray-500 shrink-0 mr-4">{label}</span>
            <span className="text-gray-200 text-right">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminReports() {
  const dispatch = useDispatch();
  const { items, count, status, error } = useSelector((s) => s.admin.reports);

  const [search, setSearch]     = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter]     = useState("all");
  const [page, setPage]         = useState(1);
  const [viewing, setViewing]   = useState(null);
  const [confirm, setConfirm]   = useState(null);
  const [actionError, setActionError] = useState("");

  const totalPages = Math.ceil(count / PAGE_SIZE) || 1;

  const load = useCallback(() => {
    const params = { page, page_size: PAGE_SIZE };
    if (search) params.search = search;
    if (statusFilter !== "all") params.status = statusFilter;
    if (typeFilter !== "all") params.type = typeFilter;  // backend uses ?type=post|review|user|club
    dispatch(fetchAdminReports(params));
  }, [dispatch, page, search, statusFilter, typeFilter]);

  useEffect(() => { load(); }, [load]);

  const handleAction = async () => {
    setActionError("");
    try {
      await dispatch(updateAdminReport({ id: confirm.id, payload: { status: confirm.newStatus } })).unwrap();
      setConfirm(null);
    } catch (error) {
      setActionError(typeof error === "string" ? error : "Unable to update this report. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="text-xl font-semibold text-white">Reports <span className="text-gray-500 text-base font-normal">({count})</span></h1>
        <div className="flex flex-wrap gap-2">
          <AdminSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search reports…" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-[#f6b042]/60"
          >
            <option value="all">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="RESOLVED">Resolved</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-[#f6b042]/60"
          >
            <option value="all">All Types</option>
            <option value="post">Post</option>
            <option value="review">Review</option>
            <option value="user">User</option>
            <option value="club">Club</option>
          </select>
        </div>
      </div>

      {status === "loading" && (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />)}</div>
      )}

      {status === "failed" && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {typeof error === "string" ? error : "Failed to load reports."}
        </div>
      )}

      {actionError && <div className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">{actionError}</div>}

      {status === "succeeded" && (
        <>
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm">No reports found.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-xs uppercase">
                    <th className="text-left px-4 py-3">Reason</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Type</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Reporter</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-right px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((r) => (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-gray-300 max-w-[200px] truncate">{r.reason}</td>
                      <td className="px-4 py-3 text-gray-400 capitalize hidden sm:table-cell">{r.target_type ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{r.reported_by ?? "—"}</td>
                      <td className="px-4 py-3"><StatusBadge status={r.status?.toLowerCase()} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end flex-wrap">
                          <button
                            onClick={() => setViewing(r)}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-white/30 transition-colors"
                          >
                            View
                          </button>
                          {["PENDING", "REVIEWED"].includes((r.status ?? "").toUpperCase()) && (
                            <>
                              <button
                                onClick={() => setConfirm({ id: r.id, newStatus: "RESOLVED", label: "Resolve Report" })}
                                className="px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs hover:bg-green-500/20 transition-colors"
                              >
                                Resolve
                              </button>
                              <button
                                onClick={() => setConfirm({ id: r.id, newStatus: "DISMISSED", label: "Dismiss Report" })}
                                className="px-2.5 py-1 rounded-md bg-gray-500/10 border border-gray-500/20 text-gray-400 text-xs hover:bg-gray-500/20 transition-colors"
                              >
                                Dismiss
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {viewing && <ReportDetailModal report={viewing} onClose={() => setViewing(null)} />}

      {confirm && (
        <ConfirmModal
          title={confirm.label}
          message="Are you sure you want to update this report's status?"
          confirmLabel={confirm.label}
          danger={false}
          onConfirm={handleAction}
          onCancel={() => setConfirm(null)}
        />
      )}
    </AdminLayout>
  );
}

export default AdminReports;
