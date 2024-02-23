import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { ErrorMessageMap, UrlMap } from "../../../data/GlobalVariable.js";
import {
  checkOrderDetail,
  orderStatusChage
} from "../../../repository/checkRepository.jsx";
import { isTokenInvalid } from "../../../repository/userRepository.jsx";

export async function showDetailFun({ orderId, setOrderData, navigate }) {
  const { success, data, code } = await checkOrderDetail({
    orderId: orderId
  });
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
    } else if (code === 1002) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.UnAuthorizedAccessError
      });
      navigate(-1);
    } else
      ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
}

export async function driveStartFun({ orderId, setDriverStatus, navigate }) {
  const { success, data, code } = await orderStatusChage({
    orderId: orderId
  });
  if (success) {
    if (data.data.hasInProgressOrder) {
      ToastMaker({
        type: "error",
        children: "한번에 한 내역만 하실 수 있어요."
      });
    } else if (!data.data.driverNearBy) {
      ToastMaker({ type: "error", children: "300m이내에서 운송상태를 변경할 수 있어요." });
    } else {
      setDriverStatus("운송 중");
      ToastMaker({ type: "success", children: "안전 운전 되세요." });
    }
  } else {
    if (isTokenInvalid(code)) navigate(UrlMap.loginPageUrl);
    if (code === 99) {
      ToastMaker({
        type: "error",
        children: "위치 정보를 허용해주세요."
      });
    }
    if (code === 1103) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.NotFindReservationError
      });
      navigate(-1);
    } else if (code === 1002) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.UnAuthorizedAccessError
      });
      navigate(-1);
    } else if (code === 4002) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.OrderAlreadyFulfilledMessage
      });
      navigate(-1);
    } else
      ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
}

export async function driveEndFun({ orderId, setDriverStatus, navigate }) {
  const { success, data, code } = await orderStatusChage({
    orderId: orderId
  });
  if (success) {
    if (!data.data.driverNearBy) {
      ToastMaker({ type: "error", children: "300m이내에서 운송상태를 변경할 수 있어요." });
    } else {
      setDriverStatus("운송 완료");
      ToastMaker({ type: "success", children: "운행이 종료되었습니다." });
    }
  } else {
    if (isTokenInvalid(code)) navigate(UrlMap.loginPageUrl);
    if (code === 99) {
      ToastMaker({
        type: "error",
        children: "위치 정보를 허용해주세요."
      });
    }
    if (code === 1103) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.NotFindReservationError
      });
      navigate(-1);
    } else if (code === 1002) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.UnAuthorizedAccessError
      });
      navigate(-1);
    } else if (code === 4002) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.OrderAlreadyFulfilledMessage
      });
      navigate(-1);
    } else
      ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
}
