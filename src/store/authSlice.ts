import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  fullName: string;
  email: string;
  avatar: string;
  username: string;
  _id: string;
};

type InitialStateType = {
  user: UserType | null;
  status: boolean;
};

const initialState: InitialStateType = { status: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LOGIN
    login: (state, action: PayloadAction<UserType>) => {
      state.status = true;
      state.user = action.payload;
    },

    // LOGOUT
    logout: (state) => {
      state.status = false;
      state.user = null;
    },

    // UPDATE USER (partial update)
    update: (state, action: PayloadAction<Partial<UserType>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, update } = authSlice.actions;
export default authSlice.reducer;
