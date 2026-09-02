import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminClubs, updateAdminClub, deleteAdminClub } from "../../features/admin/adminSlice";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import Pagination from "../../components/admin/Pagination";

const PAGE_SIZE = 20;

function AdminClubs() {
  const dispatch = useDispatch();
  const { items, count, status, error } = useSelector((s) => s.admin.clubs);

  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [page, setPage]       = useState(1);
  const [confirm, setConfirm] = useState(null);
  const [actionError, setActionError] = useState("");

  const totalPages = Math.ceil(count / PAGE_SIZE) || 1;

  const load = useCallback(() => {
    const params = { page, page_size: PAGE_SIZE };
    if (search) params.search = search;
    if (filter !== "all") params.status = filter;
    dispatch(fetchAdminClubs(params));
  }, [dispatch, page, search, filter]);

  useEffect(() => { load(); }, [load]);

  const handleConfirm = async () => {
    setActionError("");
    try {
      if (confirm.type === "delete") await dispatch(deleteAdminClub(confirm.id)).unwrap();
      if (confirm.type === "suspend") await dispatch(updateAdminClub({ id: confirm.id, payload: { status: "SUSPENDED" } })).unwrap();
      if (confirm.type === "reactivate") await dispatch(updateAdminClub({ id: confirm.id, payload: { status: "ACTIVE" } })).unwrap();
      setConfirm(null);
    } catch {
      setActionError("Unable to update this club. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="text-xl font-semibold text-white">Clubs <span className="text-gray-500 text-base font-normal">({count})</span></h1>
        <div className="flex flex-wrap gap-2">
          <AdminSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search clubs…" />
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-[#f6b042]/60"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {status === "loading" && (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />)}</div>
      )}

      {status === "failed" && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {typeof error === "string" ? error : "Failed to load clubs."}
        </div>
      )}

      {actionError && <div className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">{actionError}</div>}

      {status === "succeeded" && (
        <>
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm">No clubs found.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-xs uppercase">
                    <th className="text-left px-4 py-3">Club</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Members</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Posts</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-right px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((c) => (
                    <tr key={c.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-gray-200">{c.name}</div>
                        <div className="text-gray-500 text-xs truncate max-w-[200px]">{c.description}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{c.member_count ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">—</td>
                      <td className="px-4 py-3"><StatusBadge status={c.status?.toLowerCase() ?? "active"} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end flex-wrap">
                          {(c.status ?? "ACTIVE").toUpperCase() === "ACTIVE" ? (
                            <button
                              onClick={() => setConfirm({ type: "suspend", id: c.id, label: `Suspend "${c.name}"` })}
                              className="px-2.5 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs hover:bg-yellow-500/20 transition-colors"
                            >
                              Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() => setConfirm({ type: "reactivate", id: c.id, label: `Reactivate "${c.name}"` })}
                              className="px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs hover:bg-green-500/20 transition-colors"
                            >
                              Reactivate
                            </button>
                          )}
                          <button
                            onClick={() => setConfirm({ type: "delete", id: c.id, label: `Delete "${c.name}"` })}
                            className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-colors"
                          >
                            Delete
                          </button>
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

      {confirm && (
        <ConfirmModal
          title={confirm.label}
          message={confirm.type === "delete" ? "This cannot be undone." : "Are you sure?"}
          confirmLabel={confirm.type === "delete" ? "Delete" : confirm.type === "suspend" ? "Suspend" : "Reactivate"}
          danger={confirm.type === "delete"}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </AdminLayout>
  );
}

export default AdminClubs;
