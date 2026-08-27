// I imported useState and useSelector so I can manage the form values and get the current user.
import { useState } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating";

// I created the PostForm component to let users write and submit their movie reviews.
function PostForm({ onSubmit, initialValues = {}, submitLabel = "Post Review" }) {
  const { user } = useSelector((s) => s.auth);
  const [movie, setMovie] = useState(initialValues.movie ?? "");
  const [body, setBody] = useState(initialValues.body ?? "");
  const [stars, setStars] = useState(initialValues.stars ?? 5);
  const [error, setError] = useState("");

  // I added this function to validate the form and submit the review details.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movie.trim() || !body.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await onSubmit({
        user: { name: user?.name || user?.email || "Anonymous" },
        movie: movie.trim(),
        body: body.trim(),
        stars,
      });
      setMovie("");
      setBody("");
      setStars(5);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400 font-medium">Film Title</label>
        <input
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="e.g. Parasite"
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 text-sm transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400 font-medium">Your Review</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts about the film…"
          rows={5}
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#f6b042]/50 focus:ring-1 focus:ring-[#f6b042]/20 text-sm resize-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400 font-medium">Rating</label>
        <Rating value={stars} onChange={setStars} size="lg" />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-[#f6b042] text-black font-semibold text-sm hover:bg-[#e09a2e] transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default PostForm;
