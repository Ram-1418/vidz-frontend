import { configureStore } from "@reduxjs/toolkit";
import auth from "@/store/authSlice";
import videos from "@/store/videoSlice";
export const makeStore = () => {
  return configureStore({
    reducer: { auth, videos },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
