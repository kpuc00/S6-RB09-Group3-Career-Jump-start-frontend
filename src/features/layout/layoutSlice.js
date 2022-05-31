import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminSelectedTabId: "",
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setAdminSelectedTabId(state, action) {
      state.adminSelectedTabId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdminSelectedTabId } = layoutSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAdminSelectedTabId = (state) =>
  state.layout.adminSelectedTabId;

export default layoutSlice.reducer;
