import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RegisterForm from "./components/auth/registerForm";
import Login from "./components/auth/Login";
import App from "./App";
import Home from "./pages/Home";
import VideoPage from "./pages/videoPage";
import VideoWatch from "./pages/videoWatch";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<RegisterForm />} />
        <Route path="login" element={<Login />} />
        <Route path="video" element={<VideoPage />} />
        <Route path="/watch/:id" element={<VideoWatch />} />
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
