import { configureStore } from "@reduxjs/toolkit";
import auth from "@/store/authSlice";
export const makeStore = () => {
  return configureStore({
    reducer: { auth },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
