import { Routes, Route } from "react-router-dom";
import { Home, Login, Page, CandidateRegistration } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page" element={<Page />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CandidateRegistration />}/>
    </Routes>
  );
};
export default Router;
