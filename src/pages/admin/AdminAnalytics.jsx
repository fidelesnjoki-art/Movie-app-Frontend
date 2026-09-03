import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../../features/admin/adminSlice";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const GOLD = "#f6b042";
const BLUE = "#60a5fa";
const PINK = "#f472b6";

function ChartCard({ title, children }) {
  return (
    <div className="bg-white/3 border border-white/5 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

const tooltipStyle = {
  contentStyle: { background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 },
  labelStyle: { color: "#9ca3af" },
};

function AdminAnalytics() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((s) => s.admin.analytics);

  useEffect(() => { dispatch(fetchAnalytics()); }, [dispatch]);

  if (status === "loading") {
    return (
      <AdminLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-64 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
      </AdminLayout>
    );
  }

  if (status === "failed") {
    return (
      <AdminLayout>
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {typeof error === "string" ? error : "Failed to load analytics."}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-xl font-semibold text-white mb-5">Analytics</h1>

      {!data ? (
        <p className="text-gray-500 text-sm">No analytics data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {data.users_registered?.length > 0 && (
            <ChartCard title="User Registrations">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.users_registered}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="count" stroke={GOLD} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {data.posts_created?.length > 0 && (
            <ChartCard title="Posts Created">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.posts_created}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="count" stroke={BLUE} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {data.most_popular_genres?.length > 0 && (
            <ChartCard title="Popular Genres">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.most_popular_genres} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <YAxis dataKey="genre" type="category" tick={{ fill: "#9ca3af", fontSize: 11 }} width={80} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="count" fill={GOLD} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {data.most_reviewed_movies?.length > 0 && (
            <ChartCard title="Most Reviewed Movies">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.most_reviewed_movies.slice(0, 8)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <YAxis dataKey="movie_title" type="category" tick={{ fill: "#9ca3af", fontSize: 11 }} width={100} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="review_count" fill={PINK} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {data.clubs_created?.length > 0 && (
            <ChartCard title="Clubs Created">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.clubs_created}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="count" stroke={PINK} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {data.most_active_clubs?.length > 0 && (
            <ChartCard title="Most Active Clubs">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.most_active_clubs.slice(0, 8)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#9ca3af", fontSize: 11 }} width={100} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="member_count" fill={BLUE} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

        </div>
      )}
    </AdminLayout>
  );
}

export default AdminAnalytics;
