import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormContainer from "../../components/FormContainer/index.jsx";
import AuthHeader from "../../components/AuthHeaer/index.jsx";
import Forms from "../../components/Forms/index.jsx";
import AuthContext from "../../context/auth.context.js";
const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const formField = [
    { type: "email", placeholder: "Email", name: "email" },
    { type: "password", placeholder: "Password", name: "password" },
  ];

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const isLogin = await handleLogin(formData);
      if (isLogin) {
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMessage(
        "Login failed: " + err.response?.data.message || err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="w-full h-full bg-no-repeat min-h-screen bg-center bg-cover flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: "url(/bg.jpg)" }}
    >
      <FormContainer>
        <AuthHeader link={"/signup"} btnText={"Create Account"} />
        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
        )}
        <Forms
          formField={formField}
          formTitle={"User Login"}
          btnText={isLoading ? "Logging in..." : "Login To Continue"}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={isLoading}
        />
      </FormContainer>
    </div>
  );
};

export default Login;
