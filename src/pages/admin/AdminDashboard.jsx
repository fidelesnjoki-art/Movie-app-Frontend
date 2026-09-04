import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../features/admin/adminSlice";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";

function StatCard({ label, value, color = "text-white" }) {
  return (
    <div className="bg-white/3 border border-white/5 rounded-xl p-4">
      <div className={`text-2xl font-bold ${color}`}>{value ?? "—"}</div>
      <div className="text-gray-500 text-xs mt-1">{label}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white/3 border border-white/5 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
      {children}
    </div>
  );
}

function AdminDashboard() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((s) => s.admin.dashboard);

  useEffect(() => { dispatch(fetchDashboard()); }, [dispatch]);

  if (status === "loading") {
    return (
      <AdminLayout>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[...Array(8)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
      </AdminLayout>
    );
  }

  if (status === "failed") {
    return (
      <AdminLayout>
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {typeof error === "string" ? error : "Failed to load dashboard."}
        </div>
      </AdminLayout>
    );
  }

  // Backend returns { statistics: {...}, recent_activity: {...} }
  const s = data?.statistics ?? {};
  const r = data?.recent_activity ?? {};

  const stats = [
    { label: "Total Users",          value: s.total_users,            color: "text-[#f6b042]" },
    { label: "Active Users",         value: s.active_users,           color: "text-green-400" },
    { label: "Inactive Users",       value: s.inactive_users,         color: "text-gray-400" },
    { label: "Movies",               value: s.total_movies,           color: "text-blue-400" },
    { label: "Clubs",                value: s.total_clubs,            color: "text-pink-400" },
    { label: "Posts",                value: s.total_posts,            color: "text-cyan-400" },
    { label: "Reviews & Comments",   value: s.total_reviews_comments, color: "text-yellow-400" },
    { label: "Pending Reports",      value: s.pending_reports,        color: "text-red-400" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-xl font-semibold text-white mb-5">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((st) => <StatCard key={st.label} {...st} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Recent Users">
          {r.users?.length ? (
            <ul className="space-y-2">
              {r.users.map((u) => (
                <li key={u.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{u.name || u.email}</span>
                  <StatusBadge status={u.is_active ? "active" : "inactive"} />
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500 text-sm">No recent users.</p>}
        </Section>

        <Section title="Recent Reports">
          {r.reports?.length ? (
            <ul className="space-y-2">
              {r.reports.map((rep) => (
                <li key={rep.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 truncate max-w-[60%]">{rep.reason}</span>
                  <StatusBadge status={rep.status?.toLowerCase()} />
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500 text-sm">No recent reports.</p>}
        </Section>

        <Section title="Recent Posts">
          {r.posts?.length ? (
            <ul className="space-y-2">
              {r.posts.map((p) => (
                <li key={p.id} className="text-sm text-gray-300 truncate">
                  {p.movie_title || p.body || `Post #${p.id}`}
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500 text-sm">No recent posts.</p>}
        </Section>

        <Section title="Recent Clubs">
          {r.clubs?.length ? (
            <ul className="space-y-2">
              {r.clubs.map((c) => (
                <li key={c.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{c.name}</span>
                  <span className="text-gray-500 text-xs">{c.member_count ?? 0} members</span>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500 text-sm">No recent clubs.</p>}
        </Section>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
