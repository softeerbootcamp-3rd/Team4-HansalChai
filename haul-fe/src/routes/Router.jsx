import { BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { lazy, useEffect,Suspense } from "react";
import Splash from "../views/Splash/Splash.jsx";
import ChoiceTransport from "../views/Request/ChoiceTransport/ChoiceTransport.jsx";
import ChoiceDate from "../views/Request/ChoiceDate/ChoiceDate.jsx";
import ChoiceTime from "../views/Request/ChoiceTime/ChoiceTime";
import ChoiceSrc from "../views/Request/ChoiceSrc/ChoiceSrc.jsx";
import ChoiceDst from "../views/Request/ChoiceDst/ChoiceDst.jsx";
import ChoiceLoadInfo from "../views/Request/ChoiceLoadInfo/ChoiceLoadInfo.jsx";
import Result from "../views/Request/Result/Result.jsx";
import Complete from "../views/Request/Complete/Complete.jsx";
import Check from "../views/Check/List/Check.jsx";
import CheckDetail from "../views/Check/CheckDetail/CheckDetail.jsx";
import Purchase from "../views/Request/Purchase/Purchase.jsx";
import GuestCheck from "../views/Check/GuestCheck/GuestCheck.jsx";
import Loading from "../views/Loading/Loading.jsx";
import { isLoginFun } from "../utils/localStorage.js";
import { UrlMap } from "../data/GlobalVariable.js";


const SignUp = lazy(() => import("../views/SignUp/SignUp.jsx"));
const Login = lazy(() => import("../views/Login/Login.jsx"));
const More = lazy(() => import("../views/More/List/More.jsx"));
const Terms = lazy(() => import("../views/More/Terms/Terms.jsx"));
const Contract = lazy(() => import("../views/More/Terms/Contract/Contract.jsx"));
const UserInfo = lazy(() => import("../views/More/UserInfo/UserInfo.jsx"));
const UserPayments = lazy(() => import("../views/More/UserPayments/UserPayments.jsx"));
const GuestInfo = lazy(()=> import("../views/Request/GuestInfo/GuestInfo.jsx"))

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<LoginCheckRoute />}>
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
          <Route path="/request" element={<Outlet />}>
            <Route path="type" element={<ChoiceTransport />} />
            <Route path="date" element={<ChoiceDate />} />
            <Route path="time" element={<ChoiceTime />} />
            <Route path="source" element={<ChoiceSrc />} />
            <Route path="destination" element={<ChoiceDst />} />
            <Route path="loadInfo" element={<ChoiceLoadInfo />} />
            <Route path="result" element={<Result />} />
            <Route path="purchase" element={<Purchase />} />
            <Route path="guestInfo" element={<GuestInfo />} />
            <Route path="complete" element={<Complete />} />
          </Route>
          <Route path="/check" element={<Outlet />}>
            <Route path="guest" element={<GuestCheck />} />
            <Route path="list" element={<Check />} />
            <Route
              path="detail/:reservid"
              element={<CheckDetail driver={null} car={null} map={null} />}
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

const LoginCheckRoute = () => {
  const navigate = useNavigate();
  const isLoggedIn = isLoginFun();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(UrlMap.loginPageUrl, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : null;
};

export default Router;
