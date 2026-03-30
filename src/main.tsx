import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App";

// Layouts

import MainLayout from "./layout/MainLayout.js";
import AuthLayout from "./layout/AuthLayout.js";

import Home from "./pages/Home";
import VideoPage from "./pages/videoPage";
import VideoWatch from "./pages/videoWatch";
import UserProfile from "./pages/UserProfile";
import TweetsPage from "./pages/TweetPage";
import SubscribedChannelsPage from "./pages/SubscribedChannelsPage";
import LikedVideosPage from "./pages/LikedVideoPage";

// Auth
import RegisterForm from "./components/auth/registerForm";
import Login from "./components/auth/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* 🔐 MAIN APP (with navbar + sidebar) */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="video" element={<VideoPage />} />
        <Route path="watch/:id" element={<VideoWatch />} />
        <Route path="profile/:username" element={<UserProfile />} />
        <Route path="subscriptions" element={<SubscribedChannelsPage />} />
        <Route path="tweet" element={<TweetsPage />} />
        <Route path="liked-videos" element={<LikedVideosPage />} />
      </Route>

 
      <Route element={<AuthLayout />}>
        <Route path="signup" element={<RegisterForm />} />
        <Route path="login" element={<Login />} />
      </Route>

    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);