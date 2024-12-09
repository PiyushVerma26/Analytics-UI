import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/auth.context";

function PublicPage() {
  const { isLogin } = useContext(AuthContext);
  console.log(isLogin, "fromPublic");
  if (isLogin) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}

export default PublicPage;
