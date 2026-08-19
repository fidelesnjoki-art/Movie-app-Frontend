function Comment({ comment }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/3 p-3 text-sm text-gray-300">
      <div className="font-medium text-white">{comment.user?.name || "User"}</div>
      <p className="mt-1 text-gray-400">{comment.text}</p>
    </div>
  );
}

export default Comment;
