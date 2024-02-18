import React, { useState, useEffect } from "react";
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
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { UrlMap } from "../../../data/GlobalVariable.js";
import {
  orderApprove,
  orderDetail
} from "../../../repository/createRepository.jsx";

const ScheduleCreateDetail = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const driverName = "시현";
  const navigate = useNavigate();

  useEffect(() => {
    showDetailFun();
  }, []);

  async function showDetailFun() {
    const { success, data, message } = await orderDetail({ orderId: orderId });
    if (success) {
      setOrderData(data.data);
    } else {
      //FIXME: 예외처리 생성 시 적용
      ToastMaker({ type: "error", children: message });
      navigate(-1);
    }
  }

  async function createScheduleBtnFun() {
    const { success, data, message } = await orderApprove({ orderId: orderId });
    if (success) {
      navigate(UrlMap.completePageUrl);
    } else {
      //FIXME: 예외처리 생성 시 적용
      ToastMaker({ type: "error", children: message });
    }
  }

  if (!orderData) {
    return <div>Loading...</div>;
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
          <UserInfoBox key="src" kind="src" tel={orderData.user.tel} />,
          <UserInfoBox key="dst" kind="dst" tel={orderData.user.tel} />
        ]}
        initialIndex={0}
      />
      <Margin height="20px" />
      <HaulInfoBox
        time="2023.11.28 13:50"
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
      <BottomButton role="main" onClick={createScheduleBtnFun}>
        일정 잡기
      </BottomButton>
      <Margin height="30px" />
    </MobileLayout>
  );
};

export default ScheduleCreateDetail;
