import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminActivities } from "../../features/admin/adminSlice";
import AdminLayout from "../../components/admin/AdminLayout";

function getUserLabel(activity) {
  return activity.actor_email || "Unknown user";
}

function getMovieLabel(activity) {
  if (activity.movie_title) return activity.movie_title;
  if (typeof activity.movie === "string") return activity.movie;
  return activity.movie?.title || activity.movie?.name || "";
}

function getActionLabel(activity) {
  return activity.description || activity.action || activity.activity || activity.action_type || "performed an activity";
}

function formatActivity(activity) {
  const user = getUserLabel(activity);
  const action = getActionLabel(activity);
  const movie = getMovieLabel(activity);
  return movie ? `${user} ${action} for ${movie}` : `${user} ${action}`;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function AdminActivities() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.admin.activities);

  useEffect(() => {
    dispatch(fetchAdminActivities());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-white">Activity Log</h1>
        <p className="text-sm text-gray-500 mt-1">Recent activity across the platform</p>
      </div>

      {status === "loading" && (
        <div className="space-y-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-16 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {status === "failed" && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {typeof error === "string" ? error : "Failed to load activity."}
        </div>
      )}

      {status === "succeeded" && (
        items.length === 0 ? (
          <p className="text-gray-500 text-sm">No activity found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-xs uppercase">
                  <th className="text-left px-4 py-3">Activity</th>
                  <th className="text-left px-4 py-3">Date and time</th>
                </tr>
              </thead>
              <tbody>
                {items.map((activity) => (
                  <tr key={activity.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-4 text-gray-200">{formatActivity(activity)}</td>
                    <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(activity.created_at || activity.timestamp || activity.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </AdminLayout>
  );
}

export default AdminActivities;
