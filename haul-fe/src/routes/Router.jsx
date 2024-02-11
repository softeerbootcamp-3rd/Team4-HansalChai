import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import TestView from "../views/TestView.jsx";
import Splash from "../views/Splash/Splash.jsx";
import Login from "../views/Login/Login.jsx";
import GuestLogin from "../views/GuestLogin/GuestLogin.jsx";
import SignUP from "../views/SignUp/SignUp.jsx";
import More from "../views/More/More.jsx";
import Terms from "../views/Terms/Terms.jsx";
import UserInfo from "../views/UserInfo/UserInfo.jsx";
import ChoiceTransport from "../views/Request/ChoiceTransport/ChoiceTransport.jsx";
import ChoiceDate from "../views/Request/ChoiceDate/ChoiceDate.jsx";
import ChoiceTime from "../views/Request/ChoiceTime/ChoiceTime";
import ChoiceSrc from "../views/Request/ChoiceSrc/ChoiceSrc.jsx";
import ChoiceDst from "../views/Request/ChoiceDst/ChoiceDst.jsx";
import ChoiceLoadInfo from "../views/Request/\bChoiceLoadInfo/ChoiceLoadInfo.jsx";
import Contract from "../views/Contract/Contract.jsx";
import Check from "../views/Check/Check.jsx";
import UserPayments from "../views/UserPayments/UserPayments.jsx";
import CheckDetail from "../views/CheckDetail/CheckDetail.jsx";

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
        <Route path="list" element={<More />} />
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
        <Route path="user-payments" element={<UserPayments />} />
      </Route>
      <Route path="/Test" element={<TestView />} />
      <Route path="/request" element={<Outlet />}>
        <Route path="type" element={<ChoiceTransport />} />
        <Route path="date" element={<ChoiceDate />} />
        <Route path="time" element={<ChoiceTime />} />
        <Route path="source" element={<ChoiceSrc />} />
        <Route path="destination" element={<ChoiceDst />} />
        <Route path="loadInfo" element={<ChoiceLoadInfo />} />
      </Route>
      <Route path="/check" element={<Outlet />}>
        <Route path="list" element={<Check />} />
        <Route
          path="detail"
          element={
            /*TODO: 예약ID로 넘어가도록 바꿀 것*/
            <CheckDetail driver={null} car={null} map={null} />
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
