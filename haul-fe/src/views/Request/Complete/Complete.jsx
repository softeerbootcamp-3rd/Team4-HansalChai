import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Loading_Truck from "../../../assets/gifs/Haul_Complete_Loading.gif";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import { UrlMap } from "../../../data/GlobalVariable.js";
import { useNavigate } from "react-router-dom";
import { getIsMember } from "../../../utils/localStorage.js";
import styled from "styled-components";

const LoadingImg = styled.img`
  width: 95%;
`

const Complete = () => {
  const navigation = useNavigate();
  function goHome() {
    navigation(UrlMap.choiceTranportTypeUrl);
  }
  function goReservationList() {
    if (getIsMember() === "false") {
      navigation(UrlMap.checkReservationGuestPageUrl);
      return;
    }
    navigation(UrlMap.checkReservationPageUrl);
  }

  return (
    <MobileLayout color="completeGray">
      <Margin height="60px" />
      <Typography font="bold24">예약을 완료했어요.</Typography>
      <Margin height="80px" />
      <Flex kind="flexCenter">
        <LoadingImg src={Loading_Truck} />
      </Flex>
      <Margin height="30px" />
      <Typography font="bold24">잠시 후에 기사가</Typography>
      <Margin height="4px" />
      <Typography font="bold24">배정되는대로 알려드릴게요.</Typography>
      <Margin height="8px" />
      {getIsMember() === "false" && (
        <Typography font="semi20" color="subColor">
          비회원의 경우, 기사님께 직접 결제를 해주세요.
        </Typography>
      )}
      <FixedCenterBox bottom="30px">
        <BottomButton
          role="main"
          onClick={() => {
            goHome();
          }}
        >
          홈으로 가기
        </BottomButton>
        <Margin height="10px" />
        <BottomButton
          role="sub"
          onClick={() => {
            goReservationList();
          }}
        >
          예약 확인하러 가기
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};

export default Complete;
