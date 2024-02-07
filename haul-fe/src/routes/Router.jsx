import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestView from "../views/TestView";
import Splash from "../views/Splash/Splash";
import Login from "../views/Login/Login";
import GuestLogin from "../views/GuestLogin/GuestLogin";
import SignUP from "../views/SignUp/SignUp";
import More from "../views/More/More";
import ServiceInfo from "../views/ServiceInfo/ServiceInfo";
import UserInfo from "../views/UserInfo/UserInfo";
import ChoiceTransport from "../views/ChoiceTransport/ChoiceTransport";
import ChoiceDate from "../views/ChoiceDate/ChoiceDate";
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
      <Route path="/more" element={<More />} />
      <Route path="/more/serviceInfo" element={<ServiceInfo />} />
      <Route path="/more/userInfo" element={<UserInfo />} />
      <Route path="/Test" element={<TestView />} />
      <Route
        path="/haulRequest/choiceTransport"
        element={<ChoiceTransport />}
      />
      <Route path="/haulRequest/choiceDate" element={<ChoiceDate />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
