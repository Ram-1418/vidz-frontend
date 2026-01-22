import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RegisterForm from "./components/auth/registerForm.tsx";
import Login from "./components/auth/Login.tsx";

// ✅ Router definition
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes with Navbar */}

      {/* Routes WITHOUT Navbar */}

      <Route path="signup" element={<RegisterForm />} />
      <Route path="/login" element={<Login />} />
    </>,
  ),
);

// ✅ Render app
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
