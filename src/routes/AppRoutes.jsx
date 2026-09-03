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
import AdminRoute from "./AdminRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminClubs from "../pages/admin/AdminClubs";
import AdminPosts from "../pages/admin/AdminPosts";
import AdminReviews from "../pages/admin/AdminReviews";
import AdminReports from "../pages/admin/AdminReports";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminComments from "../pages/admin/AdminComments";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminMovies from "../pages/admin/AdminMovies";
import AdminActivities from "../pages/admin/AdminActivities";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Public browsing routes */}
      <Route path="/" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/clubs/:id" element={<ClubDetails />} />

      {/* Protected actions / pages */}
      <Route path="/posts/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      <Route path="/clubs/create" element={<ProtectedRoute><CreateClub /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;
