import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import { fetchWatchlist } from "./features/watchlist/watchlistSlice";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchWatchlist());
  }, [dispatch, isAuthenticated]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
