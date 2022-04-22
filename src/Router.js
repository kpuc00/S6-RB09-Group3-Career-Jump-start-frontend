import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import cookie from "react-cookies";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "./features/auth/authSlice";
import { Home, Login, NotFound, Page, Admin } from "./pages";
import Logout from "./pages/auth/Logout";
import { Candidates, Companies, SoftFactors } from "./components";

const Router = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const userCookie = cookie.load("user");
    if (userCookie) {
      dispatch(setUser(userCookie));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={user ? <Navigate replace to="/" /> : <Login />}
      />
      <Route path="/admin" element={<Admin />}>
        <Route path="candidates" element={<Candidates />} />
        <Route path="companies" element={<Companies />} />
        <Route path="softfactors" element={<SoftFactors />} />
      </Route>
      <Route
        path="/page"
        element={user ? <Page /> : <Navigate replace to="/login" />}
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
