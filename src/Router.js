import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAdmin,
  selectIsCandidate,
  selectIsCompany,
  selectIsMatcher,
  selectIsRegistered,
  selectUser,
} from "./features/auth/authSlice";
import {
  Home,
  Login,
  NotFound,
  ProfilePage,
  Register,
  Admin,
  Questionnaire,
  PrivacyPolicy
} from "./pages";
import {
  Candidates,
  Companies,
  Questions,
  RegistrationForm,
  SoftFactors,
} from "./components";

const Router = () => {
  const user = useSelector(selectUser);
  const isCompany = useSelector(selectIsCompany);
  const isCandidate = useSelector(selectIsCandidate);
  const isMatcher = useSelector(selectIsMatcher);
  const isAdmin = useSelector(selectIsAdmin);
  const isRegistered = useSelector(selectIsRegistered);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user && isCompany ? (
            <Navigate replace to="/" />
          ) : user && isCandidate ? (
            <Navigate replace to="/profile" />
          ) : user && isMatcher ? (
            <Navigate replace to="/" />
          ) : user && isAdmin ? (
            <Navigate replace to="/admin" />
          ) : (
            <Home />
          )
        }
      />
      <Route
        path="/login"
        element={
          user && isCompany ? (
            <Navigate replace to="/" />
          ) : user && isCandidate ? (
            <Navigate replace to="/profile" />
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
        element={user && isAdmin ? <Admin /> : <Navigate replace to="/login" />}
      >
        <Route path="candidates" element={<Candidates />} />
        <Route path="companies" element={<Companies />} />
        <Route path="softfactors" element={<SoftFactors />} />
        <Route path="questions" element={<Questions />} />
      </Route>
      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate replace to="/login" />}
      />
      <Route
        path="/register"
        element={isRegistered ? <Navigate replace to="/login" /> : <Register />}
      />
      <Route
        path="/candidate"
        element={
          isRegistered ? <Navigate replace to="/login" /> : <RegistrationForm />
        }
      />
      <Route
        path="/questionnaire"
        element={
          user && !user.questionnaireAnswered ? (
            <Questionnaire />
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
