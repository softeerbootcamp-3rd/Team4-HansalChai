import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { reservationStore } from "../../../store/reservationStore.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import Carousel from "../../../components/Carousel/Carousel.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Card1 from "../../../assets/svgs/Card1.svg";
import Card2 from "../../../assets/svgs/Card2.svg";
import Card3 from "../../../assets/svgs/Card3.svg";
import Flex from "../../../components/Flex/Flex.jsx";
import { UrlMap, ErrorMessageMap } from "../../../data/GlobalVariable.js";
import { memberReservationConfirmFun } from "../../../repository/reservationRepository.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { isTokenInvalid } from "../../../repository/userRepository.js";

const ConfirmSelected = styled.img`
  width: fit-content;
  height: fit-content;
`;

const Purchase = () => {
  const location = useLocation();

  const { setInitialState } = useContext(reservationStore);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isChoosing, setIsChoosing] = useState(true);
  const navigator = useNavigate();
  const { cost } = location.state;

  const cardList = [Card1, Card2, Card3];

  const selectIndex = () => {
    setIsChoosing(() => false);
  };

  const confirmSelectedIndex = async () => {
    const { reservationId } = location.state;
    const { success, code } = await memberReservationConfirmFun({
      reservationId: reservationId
    });
    if (success) {
      setInitialState();
      navigator(UrlMap.completePageUrl);
    } else {
      if (isTokenInvalid(code)) navigator(UrlMap.loginUrl);
      if (code === 1103)
        ToastMaker({
          type: "error",
          children: ErrorMessageMap.NotFindReservationError
        });
      else if (code === 3001) {
        ToastMaker({
          type: "error",
          children: ErrorMessageMap.AlreadyReservationError
        });
        navigator(UrlMap.choiceTranportTypeUrl);
      } else
        ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
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
