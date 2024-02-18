import FixedCenterBox from "../../../../components/FixedBox/FixedCenterBox";
import BottomButton from "../../../../components/Button/BottomButton";
import { useState } from "react";
import ToastMaker from "../../../../components/Toast/ToastMaker";

const DriverStatusButton = ({ orderId, status }) => {
  const [driverStatus, setDriverStatus] = useState(status);
  function driveStartFun(orderId) {
    //시작 로직

    setDriverStatus("운송 중");
    ToastMaker({ type: "success", children: "안전 운전 되세요." });
  }

  function driveEndFun(orderId) {
    //도착 로직

    setDriverStatus("운송 완료");
    ToastMaker({ type: "success", children: "수고하셨습니다." });
  }

  return (
    <FixedCenterBox bottom="30px">
      {driverStatus === "운송 전" && (
        <BottomButton role="main" onClick={driveStartFun}>
          운송 출발
        </BottomButton>
      )}
      {driverStatus === "운송 중" && (
        <BottomButton role="sub" onClick={driveEndFun}>
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
