import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestView from "../views/TestView";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TestView />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
