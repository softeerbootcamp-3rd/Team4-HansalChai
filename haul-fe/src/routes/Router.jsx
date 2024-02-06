import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestView from "../views/TestView";
import Splash from "../views/Splash/Splash";
import Login from "../views/Login/Login";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Test" element={<TestView />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
