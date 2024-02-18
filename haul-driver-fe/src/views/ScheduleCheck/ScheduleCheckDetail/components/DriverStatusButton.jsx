import FixedCenterBox from "../../../../components/FixedBox/FixedCenterBox";
import BottomButton from "../../../../components/Button/BottomButton";
import { useState } from "react";
import ToastMaker from "../../../../components/Toast/ToastMaker";
import { orderStatusChage } from "../../../../repository/checkRepository";

const DriverStatusButton = ({ orderId, status }) => {
  const [driverStatus, setDriverStatus] = useState(status);

  async function driveStartFun(orderId) {
    const { success, data, message } = await orderStatusChage({
      orderId: orderId
    });
    console.log(data);
    if (success) {
      setDriverStatus("운송 중");
      ToastMaker({ type: "success", children: "안전 운전 되세요." });
    } else {
      //FIXME: 예외처리 생성 시 적용
      ToastMaker({ type: "error", children: message });
    }
  }

  async function driveEndFun(orderId) {
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

  return (
    <FixedCenterBox bottom="30px">
      {driverStatus === "운송 전" && (
        <BottomButton role="main" onClick={() => driveStartFun(orderId)}>
          운송 출발
        </BottomButton>
      )}
      {driverStatus === "운송 중" && (
        <BottomButton role="sub" onClick={() => driveEndFun(orderId)}>
          운송 도착
        </BottomButton>
      )}
      {driverStatus === "운송 완료" && (
        <BottomButton role="main" disabled={true}>
          운송 완료
        </BottomButton>
      )}
    </FixedCenterBox>
  );
};

export default DriverStatusButton;
