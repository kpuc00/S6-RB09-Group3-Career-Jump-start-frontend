import { configureStore } from "@reduxjs/toolkit";
import { layoutSlice, authSlice, userSlice } from "../features";

export default configureStore({
  reducer: {
    layout: layoutSlice,
    auth: authSlice,
    user: userSlice,
  },
});
