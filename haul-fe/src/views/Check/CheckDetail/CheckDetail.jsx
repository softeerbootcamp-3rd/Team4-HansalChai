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
import {
  getGuestReservationDetails,
  getUserReservationDetails
} from "../../../repository/checkRepository.js";
import { useEffect, useState } from "react";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { getIsMember } from "../../../utils/localStorage.js";

const phaseMap = {
  "예약 전": "before",
  "매칭 중": "before",
  "운송 전": "reserv",
  "운송 중": "moving",
  "운송 완료": "after"
};

const ReservItemFrame = styled(Flex)`
  width: 100%;
  padding-bottom: 83px;
  ${({ theme }) => theme.flex.flexColumn};
  overflow-y: scroll;
`;

const dataSetter = async ({ reservationID, setDetailData, setIsLoaded }) => {
  const response = getIsMember()
    ? await getUserReservationDetails({ reservationID })
    : await getGuestReservationDetails({ reservationID });
  if (!response.success) {
    ToastMaker(
      "error",
      "예약 정보를 불러오는데 실패했습니다. 다시 시도해주세요."
    );
  }

  const { car, src, dst, cost, requiredTime } = response.data;
  let { driver } = response.data;
  const srcCoordinate = { lat: src.latitude, lng: src.longitude };
  const dstCoordinate = { lat: dst.latitude, lng: dst.longitude };

  if (!driver) {
    driver = { name: null, tel: null, photo: null };
  }

  setDetailData(() => {
    return {
      driver,
      car,
      src,
      dst,
      srcCoordinate,
      dstCoordinate,
      cost,
      requiredTime,
      phase: phaseMap[response.data.status]
    };
  });

  setIsLoaded(true);
};

const CheckDetail = () => {
  const [detailData, setDetailData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const reservationID = useLocation().pathname.split("/").pop();

  useEffect(() => {
    dataSetter({ reservationID, setDetailData, setIsLoaded });
  }, []);

  return (
    <MobileLayout>
      <Header home={false} back={true}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          예약 확인
        </Typography>
      </Header>
      <Margin height="32px" />
      {isLoaded ? (
        <ReservItemFrame kind="flexColumn">
          <DriverInfoBox
            phase={detailData.phase}
            name={detailData.driver.name}
            tel={detailData.driver.tel}
            photo={detailData.driver.photo}
          />
          <Margin height="20px" />
          <CarInfoBox
            phase={detailData.phase}
            type={detailData.car.model}
            capacity={detailData.car.capacity}
            volumn={detailData.car.feature}
            quantity={detailData.car.count}
            photo={detailData.car.photo}
          />
          <Margin height="20px" />
          <DetailInfo
            srcCoordinate={detailData.srcCoordinate}
            srcAddress={detailData.src.address}
            srcName={detailData.src.name}
            dstCoordinate={detailData.dstCoordinate}
            dstAddress={detailData.dst.address}
            dstName={detailData.dst.name}
            fee={detailData.cost}
            time={detailData.requiredTime}
          />
        </ReservItemFrame>
      ) : (
        <></>
      )}
      <Margin height="30px" />
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default CheckDetail;
