import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/auth.context";

function ProtectedPage() {
  const { isLogin } = useContext(AuthContext);
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedPage;
