import React, { useEffect } from "react";
import RegisterForm from "./components/auth/registerForm";


import { getCurrentUser, registerUser } from "./apiServices/userAuth";
import VideoUpload from "./components/VideoUpload";

const App = () => {
  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    getCurrentUser();
  }
  return (
    <div className="bg-black text-white min-h-screen">
      <RegisterForm />
      <VideoUpload/>
    </div>
  );
};

export default App;