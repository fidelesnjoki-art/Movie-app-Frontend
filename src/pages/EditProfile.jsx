import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../features/auth/authSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name: name.trim(), bio: bio.trim(), email: email.trim() }));
    setSaved(true);
    setTimeout(() => navigate("/profile"), 800);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 text-sm transition-colors";

  const Avatar = () => {
    const initials = (name || user?.email || "?").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    return (
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f6b042]/40 to-[#ff8c42]/20 flex items-center justify-center font-bold text-[#f6b042] text-2xl">
        {initials}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <div className="max-w-xl mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-400 hover:text-white mb-6 inline-block transition-colors">
          ← Back
        </button>
        <h1 className="text-2xl font-semibold text-white mb-8">Edit Profile</h1>

        <div className="bg-white/3 border border-white/5 rounded-2xl p-6 space-y-6">

          {/* Avatar preview */}
          <div className="flex items-center gap-4">
            <Avatar />
            <div>
              <div className="text-sm text-white font-medium">{name || user?.email}</div>
              <div className="text-xs text-gray-500 mt-0.5">Avatar is generated from your name</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Display Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell the community about yourself…"
                rows={3}
                className={`${inputClass} resize-none`}
              />
              <span className="text-xs text-gray-600 text-right">{bio.length}/160</span>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  saved ? "bg-green-500/20 border border-green-500/30 text-green-400" : "bg-[#f6b042] text-black hover:bg-[#e09a2e]"
                }`}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
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

export default EditProfile;