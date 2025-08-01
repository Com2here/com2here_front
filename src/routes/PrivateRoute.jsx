import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default PrivateRoute;
