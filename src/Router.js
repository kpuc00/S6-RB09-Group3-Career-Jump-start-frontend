import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import cookie from "react-cookies";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "./features/auth/authSlice";
import {
  Home,
  Login,
  NotFound,
  Page,
  CandidateRegistration,
  Register,
  Questionnaire
} from "./pages";
import Logout from "./pages/auth/Logout";

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
      <Route
        path="/page"
        element={user ? <Page /> : <Navigate replace to="/login" />}
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route 
      path="/register/candidate" 
      element={user ? <Navigate replace to ="/questionnaire"/>:<CandidateRegistration />} />
      <Route path="/questionnaire" element={<Questionnaire />}/>
    </Routes>
  );
};
export default Router;
