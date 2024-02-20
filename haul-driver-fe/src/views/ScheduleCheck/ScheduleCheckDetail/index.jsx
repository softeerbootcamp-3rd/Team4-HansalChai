import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { ErrorMessageMap } from "../../../data/GlobalVariable.js";
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
    isTokenInvalid(code);
    if(code === 1103){
      ToastMaker({ type: "error", children: ErrorMessageMap.NotFindReservationError });
      navigate(-1);
    }
    else if(code === 1002){
      ToastMaker({ type: "error", children: ErrorMessageMap.UnAuthorizedAccessError });
      navigate(-1);
    }
    else ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
}

export async function driveStartFun({ orderId, setDriverStatus }) {
  const { success, code } = await orderStatusChage({
    orderId: orderId
  });
  if (success) {
    setDriverStatus("운송 중");
    ToastMaker({ type: "success", children: "안전 운전 되세요." });
  } else {
    isTokenInvalid(code);
    if(code === 1103){
      ToastMaker({ type: "error", children: ErrorMessageMap.NotFindReservationError });
      navigate(-1);
    }
    else if(code === 1002){
      ToastMaker({ type: "error", children: ErrorMessageMap.UnAuthorizedAccessError });
      navigate(-1);
    }
    else if(code === 4002){
      ToastMaker({ type: "error", children: ErrorMessageMap.OrderAlreadyFulfilledMessage });
      navigate(-1);
    }
    else ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
}

export async function driveEndFun({ orderId, setDriverStatus }) {
  //도착 로직
  const { success, code } = await orderStatusChage({
    orderId: orderId
  });
  if (success) {
    setDriverStatus("운송 완료");
    ToastMaker({ type: "success", children: "운행이 종료되었습니다." });
  } else {
    isTokenInvalid(code);
    if(code === 1103){
      ToastMaker({ type: "error", children: ErrorMessageMap.NotFindReservationError });
      navigate(-1);
    }
    else if(code === 1002){
      ToastMaker({ type: "error", children: ErrorMessageMap.UnAuthorizedAccessError });
      navigate(-1);
    }
    else if(code === 4002){
      ToastMaker({ type: "error", children: ErrorMessageMap.OrderAlreadyFulfilledMessage });
      navigate(-1);
    }
    else ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
}
