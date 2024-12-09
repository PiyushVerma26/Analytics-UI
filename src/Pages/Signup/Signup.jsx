import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import FormContainer from "../../components/FormContainer/index.jsx";
import AuthHeader from "../../components/AuthHeaer/index.jsx";
import Forms from "../../components/Forms/index.jsx";

const Signup = () => {
  const formField = [
    { type: "email", placeholder: "Email", name: "email" },
    { type: "text", placeholder: "Name", name: "name" },
    { type: "password", placeholder: "Password", name: "password" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { status } = await api.post("/auth/signup", formData);
      if (status === 201) {
        setSuccessMessage("Signup successful! Please log in.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setErrorMessage(
        "Signup failed: " + err.response?.data.message || err.message
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
        <AuthHeader link={"/login"} btnText={"Login"} />
        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4 text-center">
            {successMessage}
          </div>
        )}
        <Forms
          formField={formField}
          formTitle={"User SignUp"}
          btnText={isLoading ? "Creating account..." : "Create an account"}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={isLoading}
        />
      </FormContainer>
    </div>
  );
};

export default Signup;
