import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "../views/Login/Login.jsx";
import Plan from "../views/Plan/List/Plan.jsx";
import PlanDetail from "../views/Plan/PlanDetail/PlanDetail.jsx";
import Check from "../views/Check/List/Check.jsx";
import CheckDetail from "../views/Check/CheckDetail/CheckDetail.jsx";

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
      <Route path="/" element={<Login />} />
      <Route path="/plan" element={<Outlet />}>
        <Route path="" element={<Plan />} />
        <Route path="detail/:id" element={<PlanDetail />} />
      </Route>
      <Route path="/schedule-check" element={<Outlet />}>
        <Route path="" element={<Check />} />
        <Route path="detail/:id" element={<CheckDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
