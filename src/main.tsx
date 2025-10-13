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
import LoginWithUsername from "./components/loginwithusername.tsx";
import LogoutButton from "./components/LogoutButton.tsx";
import VideoUpload from "./components/VideoUpload.tsx";
import GetAllVideo from "./components/GetAllVideo.tsx";
import RefreshSession from "./components/RefreshSession.tsx";
import VideoPage from "./components/Videopage.tsx";
import MainLayout from "./components/MainLayout.tsx";
import AuthLayout from "./components/AuthLayout.tsx";

// ✅ Router definition
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes with Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<GetAllVideo />} /> {/* Default home page */}
        <Route path="videos" element={<GetAllVideo />} />
        <Route path="video/:id" element={<VideoPage />} />
        <Route path="fileupload" element={<VideoUpload />} />
        <Route path="logout" element={<LogoutButton />} />
        <Route path="refresh-session" element={<RefreshSession />} />
      </Route>

      {/* Routes WITHOUT Navbar */}
      <Route element={<AuthLayout />}>
        <Route path="registration" element={<RegisterForm />} />
        <Route path="login" element={<LoginWithUsername />} />
      </Route>
    </>
  )
);

// ✅ Render app
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
