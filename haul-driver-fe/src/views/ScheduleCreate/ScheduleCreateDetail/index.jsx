import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { UrlMap } from "../../../data/GlobalVariable.js";
import {
  orderApprove,
  orderDetail
} from "../../../repository/createRepository.jsx";
import { ErrorMessageMap } from "../../../data/GlobalVariable.js";
import { isTokenInvalid } from "../../../repository/userRepository.jsx";

export async function showDetailFun({ orderId, setOrderData, navigate }) {
  const { success, data, code } = await orderDetail({ orderId: orderId });
  if (success) {
    setOrderData(data.data);
  } else {
    isTokenInvalid(code);
    if(code === 1103){
      ToastMaker({ type: "error", children: ErrorMessageMap.NotFindReservationError });
      navigate(-1);
    }
    else ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
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
    isTokenInvalid(code);
  
  }
}
