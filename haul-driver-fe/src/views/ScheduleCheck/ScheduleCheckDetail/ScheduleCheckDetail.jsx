import MobileLayout from "../../../components/MobileLayout/MobileLayout";
import Header from "../../../components/Header/Header.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import UserInfoBox from "../../../components/UserInfoBox/UserInfoBox.jsx";
import DetailInfo from "../../../components/DetailInfo/DetailInfo.jsx";
import HaulInfoBox from "../../../components/HaulInfoBox/HaulInfoBox.jsx";
import Carousel from "../../../components/Carousel/Carousel.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import { useParams } from "react-router-dom";

const ScheduleCheckDetail = () => {
  const driverName = "시현";
  const srcCoordinate = { lat: 37.497259947611596, lng: 127.03218978408303 };
  const dstCoordinate = { lat: 37.450354677762, lng: 126.65915614333 };
  const status = "운송 전";
  const { reservationId } = useParams();

  return (
    <MobileLayout>
      <Header>
        <Typography font="bold24">
          <TypographySpan color="subColor">{driverName}기사</TypographySpan>님의
          일정<TypographySpan color="subColor"> .</TypographySpan>
        </Typography>
      </Header>

      <Margin height="24px" />
      <Carousel
        carouselList={[
          <UserInfoBox
            key="user"
            kind="user"
            name="주시현님"
            tel="010-1234-1234"
          />,
          <UserInfoBox key="src" kind="src" tel="010-1234-1234" />,
          <UserInfoBox key="dst" kind="dst" tel="010-1234-1234" />
        ]}
        initialIndex={0}
      />

      <Margin height="24px" />
      <HaulInfoBox
        time="2023.11.28 13:50"
        srcName="강남구 애니타워"
        srcAddres="서울특별시 강남구 강남대로 지하396"
        srcDetailAddress="1900호"
        dstName="강남구 애니타워2"
        dstAddress="서울특별시 강남구 강남대로 지하296"
        dstDetailAddress="1900호"
        load={1000}
        width={10}
        length={20}
        height={12}
      />

      <Margin height="20px" />
      <DetailInfo
        srcCoordinate={srcCoordinate}
        srcAddress="서울특별시 강남구 강남대로 지하396 "
        srcName="강남구 애니타워"
        srcDetailAddress="3층 오피스텔"
        dstCoordinate={dstCoordinate}
        dstAddress="부산광역시 금정구 부산대학로63번길 2"
        dstName="부산대학교"
        dstDetailAddress="컴퓨공학과 이진걸 교수님 연구실"
        fee="15"
        time="04"
      />
      <Margin height="30px" />
      <FixedCenterBox bottom="30px">
        <BottomButton role="main">운송 출발</BottomButton>
      </FixedCenterBox>
      
      <Margin height="70px" />
    </MobileLayout>
  );
};

export default ScheduleCheckDetail;
