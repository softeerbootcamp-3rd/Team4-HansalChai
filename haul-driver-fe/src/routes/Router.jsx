import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "../views/Login/Login";
import Splash from "../views/Splash/Splash";
import Complete from "../views/Complete/Complete";

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
      <Route path="/complete" element={<Complete />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
