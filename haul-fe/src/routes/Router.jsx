import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import TestView from "../views/TestView";
import Splash from "../views/Splash/Splash";
import Login from "../views/Login/Login";
import GuestLogin from "../views/GuestLogin/GuestLogin";
import SignUP from "../views/SignUp/SignUp";
import ChoiceTransport from "../views/ChoiceTransport/ChoiceTransport";
import ChoiceDate from "../views/ChoiceDate/ChoiceDate";
import ChoiceTime from "../views/ChoiceTime/ChoiceTime";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/guestLogin" element={<GuestLogin />} />
      <Route path="/signUp" element={<SignUP />} />
      <Route path="/Test" element={<TestView />} />
      <Route path="/request" element={<Outlet></Outlet>}>
        <Route path="type" element={<ChoiceTransport />} />
        <Route path="date" element={<ChoiceDate />} />
        <Route path="time" element={<ChoiceTime />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
