import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAdmin,
  selectIsCandidate,
  selectIsCompany,
  selectIsMatcher,
  selectUser,
} from "./features/auth/authSlice";
import {
  Home,
  Login,
  NotFound,
  Page,
  CandidateRegistration,
  Register,
  Admin,
} from "./pages";
import Logout from "./pages/auth/Logout";
import { Candidates, Companies, Questions, SoftFactors } from "./components";

const Router = () => {
  const user = useSelector(selectUser);
  const isCompany = useSelector(selectIsCompany);
  const isCandidate = useSelector(selectIsCandidate);
  const isMatcher = useSelector(selectIsMatcher);
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          user && isCompany ? (
            <Navigate replace to="/" />
          ) : user && isCandidate ? (
            <Navigate replace to="/" />
          ) : user && isMatcher ? (
            <Navigate replace to="/" />
          ) : user && isAdmin ? (
            <Navigate replace to="/admin" />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/admin"
        element={user ? <Admin /> : <Navigate replace to="/login" />}
      >
        <Route path="candidates" element={<Candidates />} />
        <Route path="companies" element={<Companies />} />
        <Route path="softfactors" element={<SoftFactors />} />
        <Route path="questions" element={<Questions />} />
      </Route>
      <Route
        path="/page"
        element={user ? <Page /> : <Navigate replace to="/login" />}
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/candidate" element={<CandidateRegistration />} />
    </Routes>
  );
};
export default Router;
