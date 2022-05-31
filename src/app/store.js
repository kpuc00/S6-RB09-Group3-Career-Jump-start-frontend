import { configureStore } from "@reduxjs/toolkit";
import {
  layoutSlice,
  authSlice,
  userSlice,
  softfactorSlice,
} from "../features";

export default configureStore({
  reducer: {
    layout: layoutSlice,
    auth: authSlice,
    user: userSlice,
    softfactor: softfactorSlice,
  },
});
