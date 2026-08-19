import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Discover from "../pages/Discover";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import MovieDetails from "../pages/MovieDetails";
import PostDetails from "../pages/PostDetails";
import CreatePost from "../pages/CreatePost";
import Clubs from "../pages/Clubs";
import ClubDetails from "../pages/ClubDetails";
import CreateClub from "../pages/CreateClub";
import ProtectedRoute from "./ProtectedRoute";

const Protected = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Protected><Home /></Protected>} />
      <Route path="/discover" element={<Protected><Discover /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />
      <Route path="/profile/edit" element={<Protected><EditProfile /></Protected>} />
      <Route path="/movies/:id" element={<Protected><MovieDetails /></Protected>} />
      <Route path="/posts/create" element={<Protected><CreatePost /></Protected>} />
      <Route path="/posts/:id" element={<Protected><PostDetails /></Protected>} />
      <Route path="/clubs" element={<Protected><Clubs /></Protected>} />
      <Route path="/clubs/create" element={<Protected><CreateClub /></Protected>} />
      <Route path="/clubs/:id" element={<Protected><ClubDetails /></Protected>} />
    </Routes>
  );
}

export default AppRoutes;
