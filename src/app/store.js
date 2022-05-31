import { configureStore } from "@reduxjs/toolkit";
import {authSlice, softfactorSlice} from "../features";

export default configureStore({
  reducer: {
    auth: authSlice,
    softfactor: softfactorSlice
  },
});
