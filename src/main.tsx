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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App/>} >
    <Route index element={<h1 >This is the home page</h1>}>

    </Route>
      <Route path="signup" element={<RegisterForm />} />
      <Route path="login" element={<Login />} />
    </Route>
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
