import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const getTokenFromStorage = localStorage.getItem("token");
  if (getTokenFromStorage === null) {
    return <Navigate to={"/signin"} />;
  }
  return children ? children : <Outlet />;
};
