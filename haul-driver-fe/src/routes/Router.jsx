import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Login from "../views/Login/Login";
import Splash from "../views/Splash/Splash";
import Complete from "../views/ScheduleCreate/Complete/Complete";
import ScheduleCreateDetail from "../views/ScheduleCreate/ScheduleCreateDetail/ScheduleCreateDetail";
import ScheduleCheckDetail from "../views/ScheduleCheck/ScheduleCheckDetail/ScheduleCheckDetail";

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
        <Route path=":reservationId" element={<ScheduleCreateDetail />} />
        <Route path="complete" element={<Complete />} />
      </Route>

      <Route path="/schedule-check" element={<Outlet />}>
        <Route path=":reservationId" element={<ScheduleCheckDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
