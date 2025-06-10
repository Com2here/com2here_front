import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  console.log("PrivateRoute isLoggedIn:", isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default PrivateRoute;
