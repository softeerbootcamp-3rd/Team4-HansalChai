import BottomButton from "../../../components/Button/BottomButton.jsx";
import Carousel from "../../../components/Carousel/Carousel.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Card1 from "../../../assets/pngs/card1.png";
import Card2 from "../../../assets/pngs/card2.png";
import Card3 from "../../../assets/pngs/card3.png";
import { useState } from "react";
import styled from "styled-components";
import Flex from "../../../components/Flex/Flex.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { UrlMap } from "../../../data/GlobalVariable";
import { memberReservationConfirmFun } from "../../../repository/reservationRepository.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";

const ConfirmSelected = styled.img`
  width: fit-content;
  height: fit-content;
`;

const Purchase = () => {
  const location = useLocation();
  //구매할 예약 번호
  const reservationId = location.state?.reservationId;
  //선택된 카드의 인덱스
  //(number) : number 번째 인덱스의 카드가 선택됨(캐로셀 안보임)
  const [selectedIndex, setSelectedIndex] = useState(0);
  /* 카드 선택 여부
   * true : 선택된 카드로 결제할 지 다시 물어봄
   * false: 캐로셀에서 선택
   */
  const [isChoosing, setIsChoosing] = useState(true);
  const navigator = useNavigate();
  const cost = 10000;

  const cardList = [Card1, Card2, Card3];

  const selectIndex = () => {
    setIsChoosing(() => false);
  };

  const confirmSelectedIndex = async () => {
    const { reservationId } = location.state;
    const { success, data, message } = await memberReservationConfirmFun({
      reservationId: reservationId
    });
    console.log(success, data, message);
    if (success) {
      navigator(UrlMap.completePageUrl);
    } else {
      ToastMaker({ type: "error", children: message });
    }
  };

  const resetIndex = () => {
    setIsChoosing(() => true);
  };

  return (
    <MobileLayout>
      <Header back={true} home={false}>
        HAUL
        <TypographySpan color="subColor">.</TypographySpan>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <TypographySpan color="subColor">결제 수단</TypographySpan>을
        선택해주세요.
      </Typography>
      <Margin height="68px" />
      {isChoosing ? (
        <Carousel
          carouselList={[Card1, Card2, Card3]}
          setSelectedIndex={setSelectedIndex}
          initialIndex={selectedIndex}
        ></Carousel>
      ) : (
        <Flex kind={"flexCenter"}>
          <ConfirmSelected
            src={cardList[selectedIndex]}
            alt="selected card image"
            draggable={false}
          />
        </Flex>
      )}
      {isChoosing ? (
        <FixedCenterBox bottom="20px">
          <BottomButton role="main" onClick={selectIndex}>
            카드 선택하기
          </BottomButton>
        </FixedCenterBox>
      ) : (
        <FixedCenterBox bottom="20px">
          <BottomButton role="main" onClick={confirmSelectedIndex}>
            {cost}만원 결제하기
          </BottomButton>
          <Margin height={"10px"} />
          <BottomButton role="sub" onClick={resetIndex}>
            카드 다시 고르기
          </BottomButton>
        </FixedCenterBox>
      )}
    </MobileLayout>
  );
};

export default Purchase;
