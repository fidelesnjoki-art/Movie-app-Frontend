import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminUsers, fetchAdminUser, updateUserStatus, deleteAdminUser, clearSelectedUser,
} from "../../features/admin/adminSlice";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import Pagination from "../../components/admin/Pagination";

const PAGE_SIZE = 20;

function UserDetailsModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">User Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>
        {[
          ["ID", user.id],
          ["Name", user.name || "—"],
          ["Email", user.email],
          ["Role", user.role],
          ["Posts", user.post_count ?? "—"],
          ["Comments", user.comment_count ?? "—"],
          ["Clubs", user.club_count ?? "—"],
          ["Status", <StatusBadge key="s" status={user.is_active ? "active" : "inactive"} />],
          ["Joined", user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "—"],
          ["Last Login", user.last_login ? new Date(user.last_login).toLocaleDateString() : "—"],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-sm border-b border-white/5 pb-2">
            <span className="text-gray-500">{label}</span>
            <span className="text-gray-200">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminUsers() {
  const dispatch = useDispatch();
  const { items, count, status, error, selected } = useSelector((s) => s.admin.users);

  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("all");
  const [page, setPage]           = useState(1);
  const [confirm, setConfirm]     = useState(null); // { type, id, label }
  const [actionError, setActionError] = useState("");

  const totalPages = Math.ceil(count / PAGE_SIZE) || 1;

  const load = useCallback(() => {
    const params = { page, page_size: PAGE_SIZE };
    if (search) params.search = search;
    if (filter === "active" || filter === "inactive") params.status = filter;
    if (filter === "admin") params.role = "admin";
    dispatch(fetchAdminUsers(params));
  }, [dispatch, page, search, filter]);

  useEffect(() => { load(); }, [load]);

  const handleStatusToggle = (user) => {
    setConfirm({
      type: "status",
      id: user.id,
      label: user.is_active ? "Deactivate" : "Activate",
      payload: { is_active: !user.is_active },
    });
  };

  const handleDelete = (user) => {
    setConfirm({ type: "delete", id: user.id, label: `Delete ${user.username || user.email}` });
  };

  const handleConfirm = async () => {
    setActionError("");
    try {
      if (confirm.type === "delete") await dispatch(deleteAdminUser(confirm.id)).unwrap();
      if (confirm.type === "status") await dispatch(updateUserStatus({ id: confirm.id, payload: confirm.payload })).unwrap();
      setConfirm(null);
    } catch (error) {
      setActionError(typeof error === "string" ? error : "Unable to update this user. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="text-xl font-semibold text-white">Users <span className="text-gray-500 text-base font-normal">({count})</span></h1>
        <div className="flex flex-wrap gap-2">
          <AdminSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search users…" />
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-[#f6b042]/60"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {status === "loading" && (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />)}</div>
      )}

      {status === "failed" && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {typeof error === "string" ? error : "Failed to load users."}
        </div>
      )}

      {actionError && <div className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">{actionError}</div>}

      {status === "succeeded" && (
        <>
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm">No users found.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-xs uppercase">
                    <th className="text-left px-4 py-3">User</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Email</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-right px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((u) => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-gray-200">{u.name || u.email}</td>
                      <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{u.email}</td>
                      <td className="px-4 py-3"><StatusBadge status={u.is_active ? "active" : "inactive"} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end flex-wrap">
                          <button
                            onClick={() => dispatch(fetchAdminUser(u.id))}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-white/30 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleStatusToggle(u)}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-white/30 transition-colors"
                          >
                            {u.is_active ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDelete(u)}
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

      {selected && <UserDetailsModal user={selected} onClose={() => dispatch(clearSelectedUser())} />}

      {confirm && (
        <ConfirmModal
          title={confirm.label}
          message={confirm.type === "delete" ? "This action cannot be undone." : "Are you sure you want to change this user's status?"}
          confirmLabel={confirm.label}
          danger={confirm.type === "delete"}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </AdminLayout>
  );
}

export default AdminUsers;
