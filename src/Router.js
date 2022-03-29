import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, NotFound, Page } from "./pages";
import { selectSignedIn } from "./features/auth/authSlice";
import { useSelector } from "react-redux";

const Router = () => {
  const signedIn = useSelector(selectSignedIn);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/page"
        element={signedIn ? <Page /> : <Navigate replace to="/login" />}
      />
      <Route
        path="/login"
        element={signedIn ? <Navigate replace to="/" /> : <Login />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
