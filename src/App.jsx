import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";

function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
