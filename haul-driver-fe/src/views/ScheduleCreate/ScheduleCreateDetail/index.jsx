import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { UrlMap } from "../../../data/GlobalVariable.js";
import {
  orderApprove,
  orderDetail
} from "../../../repository/createRepository.jsx";
import { ErrorMessageMap } from "../../../data/GlobalVariable.js";
import { isTokenInvalid } from "../../../repository/userRepository.jsx";
import { logoutFun } from "../../../utils/localStorage.js";

export async function showDetailFun({ orderId, setOrderData, navigate }) {
  const { success, data, code } = await orderDetail({ orderId: orderId });
  if (success) {
    setOrderData(data.data);
  } else {
    if (isTokenInvalid(code)) navigate(UrlMap.loginPageUrl);
    if (code === 1103) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.NotFindReservationError
      });
      navigate(-1);
    } else
      ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
}

export async function createScheduleBtnFun({
  orderId,
  setLoadingStatus,
  navigate
}) {
  setLoadingStatus(true);
  const { success, code } = await orderApprove({ orderId: orderId });
  if (success) {
    navigate(UrlMap.completePageUrl);
  } else {
    if (isTokenInvalid(code)) navigate(UrlMap.loginPageUrl);
    if (code === 1103) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.NotFindReservationError
      });
      navigate(-1);
    } else if (code === 4001) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.OrderAlreadyCatchedMessage
      });
      navigate(-1);
    } else if (code === 1102) {
      ToastMaker({ type: "error", children: ErrorMessageMap.TokenExpired });
      logoutFun();
      navigate(UrlMap.loginPageUrl);
    } else if (code === 4003) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.NotCompletedOrder
      });
      setLoadingStatus(false);
    } else {
      ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
    }
  }
}
