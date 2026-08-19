import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClubList from "../components/clubs/ClubList";

const GENRES = ["All", "Drama", "Horror", "Sci-Fi", "World", "Art House", "Noir"];

function Clubs() {
  const navigate = useNavigate();
  const { items: clubs, joinedIds } = useSelector((s) => s.clubs);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [tab, setTab] = useState("all");

  const filtered = clubs.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = activeGenre === "All" || c.genre === activeGenre;
    const matchesTab = tab === "all" || (tab === "joined" && joinedIds.includes(c.id));
    return matchesSearch && matchesGenre && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Film Clubs</h1>
            <p className="text-gray-400 text-sm">Join communities built around the films you love.</p>
          </div>
          <button
            onClick={() => navigate("/clubs/create")}
            className="px-4 py-2 rounded-lg bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] transition-colors shrink-0"
          >
            + Create Club
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clubs…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 transition-colors text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/8 mb-5">
          {["all", "joined"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t ? "border-[#f6b042] text-white" : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {t === "all" ? All Clubs (${clubs.length}) : My Clubs (${joinedIds.length})}
            </button>
          ))}
        </div>

        {/* Genre filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeGenre === g
                  ? "bg-[#f6b042] text-black"
                  : "bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <ClubList
          clubs={filtered}
          emptyMessage={tab === "joined" ? "You haven't joined any clubs yet." : "No clubs match your search."}
        />
      </div>
    </div>
  );
}

export default Clubs;