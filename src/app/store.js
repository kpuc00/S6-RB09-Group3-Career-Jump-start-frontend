import { configureStore } from "@reduxjs/toolkit";
import { authSlice, userSlice } from "../features";

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});
