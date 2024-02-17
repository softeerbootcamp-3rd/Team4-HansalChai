import MobileLayout from "../../../components/MobileLayout/MobileLayout";
import Header from "../../../components/Header/Header.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import UserInfoBox from "../../../components/UserInfoBox/UserInfoBox.jsx";
import DetailInfo from "../../../components/DetailInfo/DetailInfo.jsx";
import DriveTimeBox from "../../../components/DriveTimeBox/DriveTimeBox.jsx";
import Carousel from "../../../components/Carousel/Carousel.jsx";

const ScheduleCheckDetail = () => {
  const driverName = "시현";
  const srcCoordinate = { lat: 37.497259947611596, lng: 127.03218978408303 };
  const dstCoordinate = { lat: 37.450354677762, lng: 126.65915614333 };
  const status = "운송 전";

  return (
    <MobileLayout>
      <Header>
        <TypographySpan font="semiBold24" color="subColor">
          {driverName}기사
          <TypographySpan>님의 일정</TypographySpan>
        </TypographySpan>
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
      {status === "운송 전" && (
        <>
          <DriveTimeBox arriveTime="2023.11.28 14:50" />
          <Margin height="24px" />
        </>
      )}

      <DetailInfo
        srcCoordinate={srcCoordinate}
        srcAddress="서울특별시 강남구 강남대로 지하396 "
        srcName="강남구 애니타워"
        dstCoordinate={dstCoordinate}
        dstAddress="부산광역시 금정구 부산대학로63번길 2"
        dstName="부산대학교"
        fee="15"
        time="04"
      />
      <Margin height="30px" />
    </MobileLayout>
  );
};

export default ScheduleCheckDetail;
