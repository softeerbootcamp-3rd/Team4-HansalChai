import MobileLayout from "../../../components/MobileLayout/MobileLayout";
import Header from "../../../components/Header/Header";
import Typography_Span from "../../../components/Typhography/Typhography_Span";
import Typography from "../../../components/Typhography/Typhography";
import Margin from "../../../components/Margin/Margin";
import CarInfoBox from "../../../components/CarInfoBox/CarInfoBox";
import DetailInfo from "../../../components/DetailInfo/DetailInfo";
import BottomButton from "../../../components/Button/BottomButton";
import { useContext } from "react";
import { reservationStore } from "../../../store/reservationStore";
import { CompanyCallNumber } from "../../../data/GlobalVariable";

const Result = () => {
  const {
    state: { srcCoordinate, dstCoordinate },
  } = useContext(reservationStore);

  function CallCompany() {
    const phoneNumber = CompanyCallNumber;
    window.location.href = `tel:${phoneNumber}`;
  }

  return (
    <MobileLayout>
      <Margin height="20px" />
      <Header home={true}>
        HAUL
        <Typography_Span color="subColor">.</Typography_Span>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <Typography_Span color="subColor">하울</Typography_Span>에서
      </Typography>
      <Margin height="6px" />
      <Typography font="bold24">당신만을 위한 차를 준비했어요.</Typography>
      <Margin height="30px" />
      <CarInfoBox
        phase="before"
        type="포터2"
        capacity="1톤"
        volumn="10 X 15 X 3M"
        quantity={2}
      />
      <Margin height="20px" />

      <DetailInfo
        srcCoordinate={{
          lat: srcCoordinate.srcLatitude,
          lng: srcCoordinate.srcLongitude,
        }}
        srcAddress="서울특별시 강남구 강남대로 지하396 "
        srcName="강남구 애니타워"
        dstCoordinate={{
          lat: dstCoordinate.dstLatitude,
          lng: dstCoordinate.dstLongitude,
        }}
        dstAddress="부산광역시 금정구 부산대학로63번길 2"
        dstName="부산대학교"
        fee="15"
        time="04"
      />
      <Margin height="30px" />
      <BottomButton role="main">이걸로 결정할게요!</BottomButton>
      <Margin height="10px" />
      <BottomButton
        role="sub"
        onClick={() => {
          CallCompany();
        }}
      >
        유선 상담하기
      </BottomButton>
      <Margin height="30px" />
    </MobileLayout>
  );
};

export default Result;
