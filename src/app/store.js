import { configureStore } from "@reduxjs/toolkit";
import { authSlice, companySlice } from "../features";

export default configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
  },
});
