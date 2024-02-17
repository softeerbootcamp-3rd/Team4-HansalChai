import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../components/Typhography/TyphographySpan.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Lottie from "lottie-react";
import Loading_Truck from "../../assets/gifs/LoadingTruck.json";
import BottomButton from "../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import { UrlMap } from "../../data/GlobalVariable.js";
import { useNavigate } from "react-router-dom";

const Complete = () => {
  const navigation = useNavigate();
  function goHome() {
    //navigation(UrlMap.choiceTranportTypeUrl);
  }
  function goReservationList() {
    //navigation(UrlMap.checkReservationPageUrl);
  }

  return (
    <MobileLayout>
      <Margin height="60px" />
      <Typography font="bold24">일정 잡기를 완료했어요.</Typography>
      <Flex kind="flexCenter">
        <Lottie animationData={Loading_Truck} style={{ maxWidth: "500px" }} />
      </Flex>
      <Typography font="bold24">
        고객님에게 이{" "}
        <TypographySpan color="subColor">기쁜 소식</TypographySpan>을
      </Typography>
      <Margin height="4px" />
      <Typography font="bold24">전달해드릴게요.</Typography>
      <FixedCenterBox bottom="30px">
        <BottomButton
          role="main"
          onClick={() => {
            goHome();
          }}
        >
          다른 일정 잡기
        </BottomButton>
        <Margin height="10px" />
        <BottomButton
          role="sub"
          onClick={() => {
            goReservationList();
          }}
        >
          일정 확인 하기
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};

export default Complete;
