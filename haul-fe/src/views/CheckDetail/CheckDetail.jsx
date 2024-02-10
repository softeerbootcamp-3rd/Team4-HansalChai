import Header from "../../components/Header/Header.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import styled from "styled-components";
import Typography from "../../components/Typhography/Typhography.jsx";
import DriverInfoBox from "./components/DriverInfoBox.jsx";
import CarInfoBox from "../../components/CarInfoBox/CarInfoBox.jsx";
import DetailInfo from "../../components/DetailInfo/DetailInfo.jsx";

const ReservItemFrame = styled(Flex)`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  overflow-y: scroll;
`;

const CheckDetail = ({ driver, car, map }) => {
  const dummyDriver = [
    {
      phase: "before",
      name: null,
      tel: null,
      picture: null
    },
    {
      phase: "reserv",
      name: "김포터",
      tel: "010-0000-0000",
      picture: null
    },
    {
      phase: "moving",
      name: "김포터",
      tel: "010-0000-0000",
      picture: null
    },
    {
      phase: "after",
      name: "김포터",
      tel: "010-0000-0000",
      picture: null
    }
  ];
  const dummyCar = [
    {
      type: "포터2",
      phase: "before",
      capacity: "1톤",
      volumn: "10 X 15 X 3 M",
      quantity: 1
    },
    {
      type: "마이티3",
      phase: "after",
      capacity: "2.5톤",
      volumn: "10 X 15 X 3 M",
      quantity: 2
    }
  ];
  const dummyMap = {
    srcCoordinate: { lat: 37.4239627802915, lng: -122.0829089197085 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dstCoordinate: { lat: 37.4212648197085, lng: -122.0856068802915 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  };
  const dummyData = {
    driver: dummyDriver[1],
    car: dummyCar[1],
    map: dummyMap
  };
  //TODO: 실제 데이터로 교체
  if (!driver) {
    ({ driver } = dummyData);
  }
  if (!car) {
    ({ car } = dummyData);
  }
  if (!map) {
    ({ map } = dummyData);
  }

  return (
    <MobileLayout>
      <Margin height="20px" />
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
