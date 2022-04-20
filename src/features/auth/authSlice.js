import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cookie from "react-cookies";
import { login, logout } from "./authAPI";

const initialState = {
  loading: false,
  user: cookie.load("user") || null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (params, thunkAPI) => {
    const response = await login(params.email, params.password);
    // The value we return becomes the `fulfilled` action payload
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (params, thunkAPI) => {
    const response = await logout();
    // The value we return becomes the `fulfilled` action payload
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLoading(state) {
      if (!state.loading) state.loading = true;
    },
    setUser(state, action) {
      if (!state.user) state.user = action.payload;
      console.log("authslice set user", state.user, action.payload);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = false;
        if (action.payload.status) state.status = false;
        else {
          state.user = action.payload;
          cookie.save("user", action.payload, {
            path: "/",
            maxAge: 24 * 60 * 60,
          });
          localStorage.setItem("showLogoutPage", "true")
          state.signedIn = true;
        }
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        cookie.remove("user");
        state.signedIn = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { authLoading, setUser } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => {
  console.log("selectuser", state.auth.user);
  return state.auth.user;
};
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;
