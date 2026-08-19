// I imported the Redux and routing hooks so I can submit the review and navigate between pages.
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addPost } from "../features/posts/postsSlice";
import PostForm from "../components/posts/PostForm";

function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const prefillMovie = params.get("movie") ?? "";
  const movieId = params.get("movieId") ? Number(params.get("movieId")) : undefined;

  // I created this function to add the new review to the posts and return to the home page.
  const handleSubmit = (post) => {
    dispatch(addPost({ ...post, movieId }));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-400 hover:text-white mb-6 inline-block transition-colors">
          ← Back
        </button>
        <h1 className="text-2xl font-semibold text-white mb-2">Write a Review</h1>
        <p className="text-gray-400 text-sm mb-8">Share your thoughts with the community.</p>
        <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
          <PostForm
            onSubmit={handleSubmit}
            initialValues={{ movie: prefillMovie }}
            submitLabel="Publish Review"
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePost;