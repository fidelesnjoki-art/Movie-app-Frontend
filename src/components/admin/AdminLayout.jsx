import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const NAV = [
  { to: "/admin/dashboard",  label: "Dashboard",  icon: "▦" },
  { to: "/admin/users",      label: "Users",      icon: "👥" },
  { to: "/admin/movies",     label: "Movies",     icon: "🎬" },
  { to: "/admin/clubs",      label: "Clubs",      icon: "🎭" },
  { to: "/admin/posts",      label: "Posts",      icon: "📝" },
  { to: "/admin/reviews",    label: "Reviews",    icon: "⭐" },
  { to: "/admin/comments",   label: "Comments",   icon: "💬" },
  { to: "/admin/reports",    label: "Reports",    icon: "🚩" },
  { to: "/admin/analytics",  label: "Analytics",  icon: "📊" },
];

function SidebarLink({ to, label, icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
          isActive
            ? "bg-[#f6b042]/15 text-[#f6b042] font-medium"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`
      }
    >
      <span className="text-base w-5 text-center">{icon}</span>
      {label}
    </NavLink>
  );
}

function Sidebar({ onLinkClick, onLogout }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-white/5">
        <div className="text-[#f6b042] font-bold tracking-widest text-base">CINÉMA</div>
        <div className="text-gray-500 text-xs mt-0.5">Admin Panel</div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => (
          <SidebarLink key={item.to} {...item} onClick={onLinkClick} />
        ))}
      </nav>
      <div className="px-2 py-4 border-t border-white/5 space-y-0.5">
        <NavLink
          to="/admin/settings"
          onClick={onLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
              isActive ? "bg-[#f6b042]/15 text-[#f6b042] font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`
          }
        >
          <span className="text-base w-5 text-center">⚙️</span> Settings
        </NavLink>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <span className="text-base w-5 text-center">🚪</span> Logout
        </button>
      </div>
    </div>
  );
}

function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 bg-[#0f0f11] border-r border-white/5 fixed inset-y-0 left-0 z-30">
        <Sidebar onLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 bg-[#0f0f11] border-r border-white/5 flex flex-col z-50">
            <Sidebar onLinkClick={() => setSidebarOpen(false)} onLogout={handleLogout} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-56 min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-20 bg-[#0b0b0d]/90 backdrop-blur border-b border-white/5 h-14 flex items-center px-4 gap-4">
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="flex-1" />
          <span className="text-sm text-gray-400">
            {user?.name || user?.email || user?.username || "Admin"}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#f6b042]/20 flex items-center justify-center text-[#f6b042] text-xs font-bold">
            {(user?.name || user?.email || "A")[0].toUpperCase()}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
