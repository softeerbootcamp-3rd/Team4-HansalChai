import MobileLayout from "../../../components/MobileLayout/MobileLayout";
import Header from "../../../components/Header/Header";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import CarInfoBox from "../../../components/CarInfoBox/CarInfoBox.jsx";
import DetailInfo from "../../../components/DetailInfo/DetailInfo.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import { useContext, useEffect, useState } from "react";
import { reservationStore } from "../../../store/reservationStore.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { CompanyCallNumber, UrlMap } from "../../../data/GlobalVariable.js";
import { getIsMember } from "../../../utils/localStorage.js";

const Result = () => {
  const navigation = useNavigate();
  const {
    state: {
      srcCoordinate,
      dstCoordinate,
      srcAddress,
      dstAddress,
      srcName,
      dstName
    }
  } = useContext(reservationStore);

  const location = useLocation();
  const { data } = location.state;

  const [resultData, setLesultData] = useState({
    car: {
      count: 0,
      model: "string",
      capacity: "string",
      feature: "string",
      photo: "string"
    },
    src: {
      name: "string",
      address: "string",
      detailAddress: "string",
      latitude: 0,
      longitude: 0,
      tel: "string"
    },
    dst: {
      name: "string",
      address: "string",
      detailAddress: "string",
      latitude: 0,
      longitude: 0,
      tel: "string"
    },
    cost: 0,
    requiredTime: 0
  });

  function callCompany() {
    const phoneNumber = CompanyCallNumber;
    window.location.href = `tel:${phoneNumber}`;
  }

  function decideBtnFun() {
    const isMember = getIsMember();
    if (isMember === "false") {
      navigation(UrlMap.completePageUrl);
      return;
    }
    navigation(UrlMap.choicePaymentPageUrl);
  }

  return (
    <MobileLayout>
      <Header home={true}>
        HAUL
        <TypographySpan color="subColor">.</TypographySpan>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <TypographySpan color="subColor">하울</TypographySpan>에서
      </Typography>
      <Margin height="6px" />
      <Typography font="bold24">당신만을 위한 차를 준비했어요.</Typography>
      <Margin height="30px" />
      <CarInfoBox
        phase="before"
        type={data.car.model}
        capacity={data.car.capacity}
        volumn={data.car.feature}
        quantity={data.car.count}
      />
      <Margin height="20px" />

      <DetailInfo
        srcCoordinate={{
          lat: srcCoordinate.srcLatitude,
          lng: srcCoordinate.srcLongitude
        }}
        srcAddress={srcAddress}
        srcName={srcName}
        dstCoordinate={{
          lat: dstCoordinate.dstLatitude,
          lng: dstCoordinate.dstLongitude
        }}
        dstAddress={dstAddress}
        dstName={dstName}
        fee={data.cost}
        time={Number(data.requiredTime)}
      />
      <Margin height="30px" />
      <BottomButton
        role="main"
        onClick={() => {
          decideBtnFun();
        }}
      >
        이걸로 결정할게요!
      </BottomButton>
      <Margin height="10px" />
      <BottomButton
        role="sub"
        onClick={() => {
          callCompany();
        }}
      >
        유선 상담하기
      </BottomButton>
      <Margin height="30px" />
    </MobileLayout>
  );
};

export default Result;
