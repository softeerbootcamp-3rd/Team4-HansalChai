import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import {
  checkOrderDetail,
  orderStatusChage
} from "../../../repository/checkRepository.jsx";

export async function showDetailFun({ orderId, setOrderData, navigate }) {
  const { success, data, message } = await checkOrderDetail({
    orderId: orderId
  });
  if (success) {
    setOrderData(data.data);
  } else {
    //FIXME: 예외처리 생성 시 적용
    ToastMaker({ type: "error", children: message });
    navigate(-1);
  }
}

export async function driveStartFun({ orderId, setDriverStatus }) {
  const { success, data, message } = await orderStatusChage({
    orderId: orderId
  });
  if (success) {
    setDriverStatus("운송 중");
    ToastMaker({ type: "success", children: "안전 운전 되세요." });
  } else {
    //FIXME: 예외처리 생성 시 적용
    ToastMaker({ type: "error", children: message });
  }
}

export async function driveEndFun({ orderId, setDriverStatus }) {
  //도착 로직
  const { success, data, message } = await orderStatusChage({
    orderId: orderId
  });
  if (success) {
    setDriverStatus("운송 완료");
    ToastMaker({ type: "success", children: "운행이 종료되었습니다." });
  } else {
    //FIXME: 예외처리 생성 시 적용
    ToastMaker({ type: "error", children: message });
  }
}
