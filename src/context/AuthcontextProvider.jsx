import { useEffect, useState } from "react";
import AuthContext from "./auth.context.js";

import api from "../utils/api.js";

function AuthcontextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(
    () => !!localStorage.getItem("isLogin")
  );

  const handleLogin = async (formData) => {
    try {
      const { data, status } = await api.post("/auth/login", formData);
      if (data && status === 200) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("isLogin", true);
        setIsLogin(true);
      }
    } catch (error) {
      throw new Error(error.message || "Form Submission Failed! Try Again");
    }
    return isLogin;
  };

  const handleLogout = async () => {
    try {
      const { status } = await api.get("/auth/logout");
      if (status !== 200) throw new Error("Something Went Wrong");
      localStorage.setItem("authToken", "");
      localStorage.setItem("isLogin", "");
      setIsLogin(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
    return isLogin;
  };

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLogin");
    if (storedLogin !== null && storedLogin !== isLogin.toString()) {
      setIsLogin(storedLogin);
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, isLogin, setIsLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthcontextProvider;
