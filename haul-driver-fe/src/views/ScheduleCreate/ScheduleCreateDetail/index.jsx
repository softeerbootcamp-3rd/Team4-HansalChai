import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { UrlMap } from "../../../data/GlobalVariable.js";
import {
  orderApprove,
  orderDetail
} from "../../../repository/createRepository.jsx";

export async function showDetailFun({ orderId, setOrderData, navigate }) {
  const { success, data, message } = await orderDetail({ orderId: orderId });
  if (success) {
    setOrderData(data.data);
  } else {
    //FIXME: 예외처리 생성 시 적용
    navigate(UrlMap.scheduleCreatePageUrl);
  }
}

export async function createScheduleBtnFun({
  orderId,
  setLoadingStatus,
  navigate
}) {
  setLoadingStatus(true);
  const { success, message } = await orderApprove({ orderId: orderId });
  if (success) {
    navigate(UrlMap.completePageUrl);
  } else {
    //FIXME: 예외처리 생성 시 적용
    ToastMaker({ type: "error", children: message });
    setLoadingStatus(false);
  }
}
