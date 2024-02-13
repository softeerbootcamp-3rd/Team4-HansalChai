import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import styled from "styled-components";
import Typography from "../../../components/Typhography/Typhography.jsx";
import DriverInfoBox from "./components/DriverInfoBox.jsx";
import CarInfoBox from "../../../components/CarInfoBox/CarInfoBox.jsx";
import DetailInfo from "../../../components/DetailInfo/DetailInfo.jsx";
import { useLocation } from "react-router-dom";
import { dummyDetail } from "../../../data/DummyData.js";

const ReservItemFrame = styled(Flex)`
  width: 100%;
  padding-bottom: 83px;
  ${({ theme }) => theme.flex.flexColumn};
  overflow-y: scroll;
`;

const CheckDetail = ({ driver, car, map }) => {

  const location = useLocation();
  const reservId = location.pathname.split("/").pop();

  //TODO: 실제 데이터로 교체
  if (!driver) {
    ({ driver } = dummyDetail(reservId));
  }
  if (!car) {
    ({ car } = dummyDetail(reservId));
  }
  if (!map) {
    ({ map } = dummyDetail(reservId));
  }

  return (
    <MobileLayout>
      <Header home={false} back={true}>
        <Typography font={"semiBold24"}>예약 확인</Typography>
      </Header>
      <Margin height="32px" />
      <ReservItemFrame kind="flexColumn">
        <DriverInfoBox
          phase={driver.phase}
          name={driver.name}
          tel={driver.tel}
          picture={driver.picture}
        />
        <Margin height="20px" />
        <CarInfoBox
          phase={car.phase}
          type={car.type}
          capacity={car.capacity}
          volumn={car.volumn}
          quantity={car.quantity}
        />
        <Margin height="20px" />
        <DetailInfo
          srcCoordinate={map.srcCoordinate}
          srcAddress={map.srcAddress}
          srcName={map.srcName}
          dstCoordinate={map.dstCoordinate}
          dstAddress={map.dstAddress}
          dstName={map.dstName}
          fee={map.fee}
          time={map.time}
        />
      </ReservItemFrame>
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default CheckDetail;
