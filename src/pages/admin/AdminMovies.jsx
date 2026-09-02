import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminMovies, createAdminMovie, updateAdminMovie, deleteAdminMovie,
} from "../../features/admin/adminSlice";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import Pagination from "../../components/admin/Pagination";
import MovieForm from "../../components/admin/MovieForm";

const PAGE_SIZE = 20;

function AdminMovies() {
  const dispatch = useDispatch();
  const { items, count, status, error } = useSelector((s) => s.admin.movies);

  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [page, setPage]       = useState(1);
  const [modal, setModal]     = useState(null); // null | { mode: "add" | "edit", movie? }
  const [saving, setSaving]   = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [actionError, setActionError] = useState("");

  const totalPages = Math.ceil(count / PAGE_SIZE) || 1;

  const load = useCallback(() => {
    const params = { page, page_size: PAGE_SIZE };
    if (search) params.search = search;
    if (filter !== "all") params.media_type = filter;
    dispatch(fetchAdminMovies(params));
  }, [dispatch, page, search, filter]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    setSaving(true);
    setActionError("");
    try {
      if (modal.mode === "add") await dispatch(createAdminMovie(form)).unwrap();
      else await dispatch(updateAdminMovie({ id: modal.movie.id, payload: form })).unwrap();
      setModal(null);
    } catch (error) {
      setActionError(typeof error === "string" ? error : "Unable to save this title. Please check the form and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setActionError("");
    try {
      await dispatch(deleteAdminMovie(confirm.id)).unwrap();
      setConfirm(null);
    } catch (error) {
      setActionError(typeof error === "string" ? error : "Unable to delete this title. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="text-xl font-semibold text-white">Movies & Series <span className="text-gray-500 text-base font-normal">({count})</span></h1>
        <div className="flex flex-wrap gap-2">
          <AdminSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search titles…" />
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-[#f6b042]/60"
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Series</option>
          </select>
          <button
            onClick={() => setModal({ mode: "add" })}
            className="px-4 py-2 rounded-md bg-[#f6b042] text-black text-sm font-semibold hover:bg-[#e09a2e] transition-colors"
          >
            + Add
          </button>
        </div>
      </div>

      {status === "loading" && (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />)}</div>
      )}

      {status === "failed" && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {typeof error === "string" ? error : "Failed to load movies."}
        </div>
      )}

      {actionError && <div className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">{actionError}</div>}

      {status === "succeeded" && (
        <>
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm">No movies found.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-xs uppercase">
                    <th className="text-left px-4 py-3">Title</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Type</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Genre</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Featured</th>
                    <th className="text-right px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((m) => (
                    <tr key={m.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-gray-200">{m.title}</td>
                      <td className="px-4 py-3 text-gray-400 capitalize hidden sm:table-cell">{m.media_type ?? m.type ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{m.genre ?? "—"}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {m.is_featured && <StatusBadge status="featured" />}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setModal({ mode: "edit", movie: m })}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-white/30 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirm({ id: m.id, label: m.title })}
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

      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={() => setModal(null)}>
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-white font-semibold text-lg mb-4">{modal.mode === "add" ? "Add Movie / Series" : "Edit Movie / Series"}</h2>
            <MovieForm initial={modal.movie ?? {}} onSubmit={handleSave} onCancel={() => setModal(null)} loading={saving} />
          </div>
        </div>
      )}

      {confirm && (
        <ConfirmModal
          title={`Delete "${confirm.label}"`}
          message="This will permanently delete this title. This cannot be undone."
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setConfirm(null)}
        />
      )}
    </AdminLayout>
  );
}

export default AdminMovies;
