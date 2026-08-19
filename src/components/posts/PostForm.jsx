import { useState } from "react";

function PostForm({ onSubmit, submitLabel = "Post" }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit?.({ text: text.trim(), rating, user: { name: "You" } });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-[#f6b042]/50"
        placeholder="Share your thoughts..."
      />

      <div className="flex items-center justify-between gap-3">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>{value} stars</option>
          ))}
        </select>

        <button type="submit" className="rounded-lg bg-[#f6b042] px-4 py-2 text-sm font-semibold text-black">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
