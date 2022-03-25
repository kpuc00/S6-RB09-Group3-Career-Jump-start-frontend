import { Routes, Route } from "react-router-dom";
import { Home, Login, Page } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page" element={<Page />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default Router;
