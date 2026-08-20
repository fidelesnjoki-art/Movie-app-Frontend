const Avatar = ({ name }) => {
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? "?";
  return (
    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-300 text-xs font-semibold shrink-0">
      {initials}
    </div>
  );
};

function Comment({ comment }) {
  return (
    <div className="flex gap-3">
      <Avatar name={comment.user} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-white">{comment.user}</span>
          {comment.createdAt && (
            <span className="text-xs text-gray-600">{comment.createdAt}</span>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-0.5 leading-relaxed">{comment.body}</p>
      </div>
    </div>
  );
}

export default Comment;
