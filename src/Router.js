import { Routes, Route } from "react-router-dom";
import { Home, Page } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page" element={<Page />} />
    </Routes>
  );
};
export default Router;
