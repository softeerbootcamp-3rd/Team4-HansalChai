import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "../../../components/MobileLayout/MobileLayout";
import Header from "../../../components/Header/Header.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import UserInfoBox from "../../../components/UserInfoBox/UserInfoBox.jsx";
import DetailInfo from "../../../components/DetailInfo/DetailInfo.jsx";
import HaulInfoBox from "../../../components/HaulInfoBox/HaulInfoBox.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import Carousel from "../../../components/Carousel/Carousel.jsx";
import Loading from "../../Loading/Loading.jsx";
import { getUserName } from "../../../utils/localStorage.js";
import { showDetailFun, createScheduleBtnFun } from "./index.jsx";

const ScheduleCreateDetail = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const driverName = getUserName();
  const navigate = useNavigate();

  useEffect(() => {
    showDetailFun({
      orderId: orderId,
      setOrderData: setOrderData,
      navigate: navigate
    });
  }, []);

  if (!orderData || loadingStatus) {
    return <Loading />;
  }

  return (
    <MobileLayout>
      <Header>
        <Typography font="bold24">
          <TypographySpan color="subColor">{driverName}</TypographySpan>님을
          위한 일정잡기<TypographySpan color="subColor"> .</TypographySpan>
        </Typography>
      </Header>
      <Margin height="24px" />
      <Carousel
        carouselList={[
          <UserInfoBox
            key="user"
            kind="user"
            name={orderData.user.name}
            tel={orderData.user.tel}
          />,
          <UserInfoBox key="src" kind="src" tel={orderData.src.tel} />,
          <UserInfoBox key="dst" kind="dst" tel={orderData.dst.tel} />
        ]}
        initialIndex={0}
      />
      <Margin height="20px" />
      <HaulInfoBox
        time={orderData.datetime}
        srcName={orderData.src.name}
        srcAddres={orderData.src.address}
        srcDetailAddress={orderData.src.detailAddress}
        dstName={orderData.dst.name}
        dstAddress={orderData.dst.address}
        dstDetailAddress={orderData.dst.detailAddress}
        load={orderData.cargo.weight}
        width={orderData.cargo.width}
        length={orderData.cargo.length}
        height={orderData.cargo.height}
      />

      <Margin height="24px" />
      <DetailInfo
        srcCoordinate={{
          lat: orderData.src.latitude,
          lng: orderData.src.longitude
        }}
        srcAddress={orderData.src.address}
        srcName={orderData.src.name}
        dstCoordinate={{
          lat: orderData.dst.latitude,
          lng: orderData.dst.longitude
        }}
        dstAddress={orderData.dst.address}
        dstName={orderData.dst.name}
        fee={orderData.cost}
        time={orderData.requiredTime}
      />
      <Margin height="30px" />
      <BottomButton
        role="main"
        onClick={() => {
          createScheduleBtnFun({
            orderId: orderId,
            setLoadingStatus: setLoadingStatus,
            navigate: navigate
          });
        }}
      >
        일정 잡기
      </BottomButton>
      <Margin height="30px" />
    </MobileLayout>
  );
};

export default ScheduleCreateDetail;
