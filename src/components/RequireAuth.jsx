import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = () => {
  const { status, token } = useSelector((state) => state.auth);
  const location = useLocation();

  const isAuthenticated = status === "succeeded" && token;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default RequireAuth;
