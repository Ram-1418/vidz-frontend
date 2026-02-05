import React, { useEffect } from "react";

import { getCurrentUser } from "./apiServices/userAuth";

import { Outlet } from "react-router-dom";

const App = () => {
  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    getCurrentUser();
  }
  return (
    <div className="bg-black text-white min-h-screen">
      <Outlet />
    </div>
  );
};

export default App;
