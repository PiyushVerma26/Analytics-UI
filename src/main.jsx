import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import Dashboard from "./Pages/Dashboard/index.jsx";
import ProtectedPage from "./Pages/ProtectedPage/index.jsx";
import AuthcontextProvider from "./context/AuthcontextProvider.jsx";
import PublicPage from "./Pages/PublicPage/index.jsx";

const isLoggedIn = false;
const element = isLoggedIn ? "/dashboard" : "/login";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicPage />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedPage />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Navigate to={element} replace />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthcontextProvider>
      <RouterProvider router={router} />
    </AuthcontextProvider>
  </StrictMode>
);
