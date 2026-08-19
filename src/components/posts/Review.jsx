import { Link } from "react-router-dom";
import Rating from "./Rating";

function Review({ post, linkToDetail = false }) {
  const body = (
    <article className="rounded-2xl border border-white/10 bg-white/3 p-4 text-gray-300">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-medium text-white">{post.user?.name || "Anonymous"}</div>
          <div className="text-xs text-gray-500">{post.movie || "Movie"}</div>
        </div>
        <Rating value={post.rating ?? 0} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-300">{post.text}</p>
    </article>
  );

  if (!linkToDetail) return body;

  return <Link to={`/posts/${post.id}`}>{body}</Link>;
}

export default Review;
