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

const Protected = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;
const Admin = ({ children }) => <AdminRoute>{children}</AdminRoute>;

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User routes */}
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

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Admin><AdminDashboard /></Admin>} />
      <Route path="/admin/users" element={<Admin><AdminUsers /></Admin>} />
      <Route path="/admin/movies" element={<Admin><AdminMovies /></Admin>} />
      <Route path="/admin/clubs" element={<Admin><AdminClubs /></Admin>} />
      <Route path="/admin/posts" element={<Admin><AdminPosts /></Admin>} />
      <Route path="/admin/reviews" element={<Admin><AdminReviews /></Admin>} />
      <Route path="/admin/comments" element={<Admin><AdminComments /></Admin>} />
      <Route path="/admin/reports" element={<Admin><AdminReports /></Admin>} />
      <Route path="/admin/analytics" element={<Admin><AdminAnalytics /></Admin>} />
    </Routes>
  );
}

export default AppRoutes;
