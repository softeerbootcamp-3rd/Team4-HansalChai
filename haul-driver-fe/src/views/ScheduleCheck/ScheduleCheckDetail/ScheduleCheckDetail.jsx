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
import Carousel from "../../../components/Carousel/Carousel.jsx";
import DriverStatusButton from "./components/DriverStatusButton.jsx";
import Loading from "../../Loading/Loading.jsx";
import { getUserName } from "../../../utils/localStorage.js";
import { showDetailFun } from "./index.jsx";

const ScheduleCheckDetail = () => {
  const { orderId } = useParams();
  const driverName = getUserName();
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    showDetailFun({
      orderId: orderId,
      setOrderData: setOrderData,
      navigate: navigate
    });
  }, []);

  if (!orderData) {
    return <Loading />;
  }

  return (
    <MobileLayout>
      <Header>
        <Typography font="bold24">
          <TypographySpan color="subColor">{driverName}</TypographySpan>님의
          일정<TypographySpan color="subColor"> .</TypographySpan>
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
      <DriverStatusButton
        orderId={orderId}
        status={orderData.transportStatus}
      />
      <Margin height="70px" />
    </MobileLayout>
  );
};

export default ScheduleCheckDetail;
