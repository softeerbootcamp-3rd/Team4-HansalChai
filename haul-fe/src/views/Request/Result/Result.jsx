import MobileLayout from "../../../components/MobileLayout/MobileLayout";
import Header from "../../../components/Header/Header";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import CarInfoBox from "../../../components/CarInfoBox/CarInfoBox.jsx";
import DetailInfo from "../../../components/DetailInfo/DetailInfo.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import { useContext } from "react";
import { reservationStore } from "../../../store/reservationStore.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { CompanyCallNumber, UrlMap } from "../../../data/GlobalVariable.js";
import { getIsMember } from "../../../utils/localStorage.js";
import { guestReservationConfirmFun } from "../../../repository/reservationRepository.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";

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
  function callCompany() {
    const phoneNumber = CompanyCallNumber;
    window.location.href = `tel:${phoneNumber}`;
  }
  async function decideBtnFun() {
    const isMember = getIsMember();
    //비회원이라면 예약 확정 진행
    if (isMember === "false") {
      const { success, dataConfirm, message } =
        await guestReservationConfirmFun({
          reservationId: data.reservationId
        });
      if (success) {
        navigation(UrlMap.completePageUrl);
      } else {
        ToastMaker({ type: "error", children: message });
      }
      return;
    }
    navigation(UrlMap.choicePaymentPageUrl, {
      state: { reservationId: data.reservationId, cost: data.cost }
    });
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
        photo={data.car.photo}
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
