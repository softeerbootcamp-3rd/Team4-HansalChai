import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import TestView from "../views/TestView";
import Splash from "../views/Splash/Splash";
import Login from "../views/Login/Login";
import GuestLogin from "../views/GuestLogin/GuestLogin";
import SignUP from "../views/SignUp/SignUp";
import More from "../views/More/More";
import Terms from "../views/Terms/Terms";
import UserInfo from "../views/UserInfo/UserInfo";
import ChoiceTransport from "../views/ChoiceTransport/ChoiceTransport";
import ChoiceDate from "../views/ChoiceDate/ChoiceDate";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Contract from "../views/Contract/Contract";

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
      <Route path="/more" element={<Outlet />}>
        <Route path="" element={<More />} />
        <Route path="terms" element={<Outlet />}>
          <Route path="" element={<Terms />} />
          <Route path="services" element={<Contract type={"services"} />} />
          <Route path="privacy" element={<Contract type={"privacy"} />} />
          <Route
            path="transportation"
            element={<Contract type={"transportation"} />}
          />
          <Route path="location" element={<Contract type={"location"} />} />
        </Route>
        <Route path="user-info" element={<UserInfo />} />
      </Route>
      <Route path="/Test" element={<TestView />} />
      <Route path="/request" element={<Outlet />}>
        <Route path="type" element={<ChoiceTransport />} />
        <Route path="date" element={<ChoiceDate />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
