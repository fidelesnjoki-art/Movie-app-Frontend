import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClub } from "../features/clubs/clubsSlice";

const GENRES = ["Drama", "Horror", "Sci-Fi", "World", "Art House", "Noir", "Comedy", "Thriller", "Animation", "Documentary"];

function CreateClub() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [featuredMovie, setFeaturedMovie] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !genre) {
      setError("Please fill in all required fields.");
      return;
    }
    const newClub = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      genre,
      featuredMovie: featuredMovie.trim() || "TBD",
      createdBy: user?.name || user?.email || "Anonymous",
    };
    dispatch(createClub(newClub));
    navigate("/clubs");
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 text-sm transition-colors";

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-400 hover:text-white mb-6 inline-block transition-colors">
          ← Back
        </button>
        <h1 className="text-2xl font-semibold text-white mb-2">Create a Film Club</h1>
        <p className="text-gray-400 text-sm mb-8">Build a community around the films you love.</p>

        <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Club Name <span className="text-red-400">*</span></label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. New Wave Cinema" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Description <span className="text-red-400">*</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this club about?"
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Genre <span className="text-red-400">*</span></label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenre(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      genre === g
                        ? "bg-[#f6b042] text-black"
                        : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Featured Film</label>
              <input value={featuredMovie} onChange={(e) => setFeaturedMovie(e.target.value)} placeholder="e.g. Breathless" className={inputClass} />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3 pt-1">
              <button type="submit" className="flex-1 py-2.5 rounded-lg bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] transition-colors">
                Create Club
              </button>
              <button type="button" onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-lg border border-white/10 text-gray-400 text-sm hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateClub;