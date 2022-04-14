import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import cookie from "react-cookies";
import { Home, Login, NotFound, Page } from "./pages";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "./features/auth/authSlice";

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); //null

  useEffect(() => {
    const userCookie = cookie.load("user");
    if (userCookie) {
      dispatch(setUser(userCookie));
      console.log(user); // ne e null
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={user ? <Navigate replace to="/" /> : <Login />}
      />
      <Route
        path="/page"
        element={<Page />}

        //element={!user ? <Navigate replace to="/login" /> : <Page />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
