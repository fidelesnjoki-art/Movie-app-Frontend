import Comment from "./Comment";

function CommentList({ comments = [] }) {
  return (
    <div className="space-y-3">
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment, index) => <Comment key={`${comment.user?.name || "user"}-${index}`} comment={comment} />)
      )}
    </div>
  );
}

export default CommentList;
