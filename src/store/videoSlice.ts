import { VideoWithOwner } from "@/types/video.types";
import { createSlice } from "@reduxjs/toolkit";
type InitialData = {
  videos: VideoWithOwner[];
  loading: boolean;
};
const initialData: InitialData = {
  videos: [],
  loading: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState: initialData,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    },
    startVideoLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setVideos, startVideoLoading } = videoSlice.actions;

export default videoSlice.reducer;
