import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "../views/Login/Login.jsx";
import Splash from "../views/Splash/Splash";
import Complete from "../views/ScheduleCreate/Complete/Complete";
import ScheduleCreateDetail from "../views/ScheduleCreate/ScheduleCreateDetail/ScheduleCreateDetail";
import ScheduleCreateList from "../views/ScheduleCreate/ScheduleCreateList/ScheduleCreateList.jsx";
import ScheduleCheckDetail from "../views/ScheduleCheck/ScheduleCheckDetail/ScheduleCheckDetail";
import ScheduleCheckList from "../views/ScheduleCheck/ScheduleCheckList/ScheduleCheckList.jsx";
import More from "../views/More/List/More.jsx";
import Terms from "../views/More/Terms/Terms.jsx";
import Contract from "../views/More/Terms/Contract/Contract.jsx";
import UserInfo from "../views/More/UserInfo/UserInfo.jsx";

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

      <Route path="/schedule-create" element={<Outlet />}>
        <Route path="" element={<ScheduleCreateList />} />
        <Route path=":reservationId" element={<ScheduleCreateDetail />} />
        <Route path="complete" element={<Complete />} />
      </Route>

      <Route path="/schedule-check" element={<Outlet />}>
        <Route path="" element={<ScheduleCheckList />} />
        <Route path=":reservationId" element={<ScheduleCheckDetail />} />
      </Route>

      <Route path="/more" element={<Outlet />}>
        <Route path="" element={<More />} />
        <Route path="user-info" element={<UserInfo />} />
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
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
