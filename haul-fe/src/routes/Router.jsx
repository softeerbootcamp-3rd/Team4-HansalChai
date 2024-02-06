import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestView from "../views/TestView";
import Splash from "../views/Splash/Splash";
import Login from "../views/Login/Login";
import GuestLogin from "../views/GuestLogin/GuestLogin";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/guestLogin" element={<GuestLogin />} />
      <Route path="/Test" element={<TestView />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
