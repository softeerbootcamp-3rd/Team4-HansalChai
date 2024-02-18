import FixedCenterBox from "../../../../components/FixedBox/FixedCenterBox";
import BottomButton from "../../../../components/Button/BottomButton";
import { useState } from "react";
import { driveStartFun, driveEndFun } from "..";

const DriverStatusButton = ({ orderId, status }) => {
  const [driverStatus, setDriverStatus] = useState(status);

  return (
    <FixedCenterBox bottom="30px">
      {driverStatus === "운송 전" && (
        <BottomButton
          role="main"
          onClick={() =>
            driveStartFun({
              orderId: orderId,
              setDriverStatus: setDriverStatus
            })
          }
        >
          운송 출발
        </BottomButton>
      )}
      {driverStatus === "운송 중" && (
        <BottomButton
          role="sub"
          onClick={() =>
            driveEndFun({ orderId: orderId, setDriverStatus: setDriverStatus })
          }
        >
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
