import styled from "styled-components";
import Margin from "../components/Margin/Margin";
import Typography from "../components/Typhography/Typhography";
import Flex from "../components/Flex/Flex";
import Input from "../components/Input/Input";
import DetailInfo from "../components/DetailInfo/DetailInfo";
import { useRef } from "react";

import BottomButton from "../components/BottomButton.jsx";
import Header from "../components/Header.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import CarInfoBox from "../components/CarInfoBox.jsx";
import Toast from "../components/Toast/Toast.jsx";

const Box = styled.div`
  background-color: ${(props) => props.theme.colors.subColor};
  width: 100px;
  height: 100px;
`;

const TestView = () => {
  const inputValue = useRef("");

  const srcCoordinate = { lat: 37.4239627802915, lng: -122.0829089197085 };
  const dstCoordinate = { lat: 37.4212648197085, lng: -122.0856068802915 };

  return (
    <>
      <BottomButton id="mainButton" role="main">
        MainTest
      </BottomButton>
      <BottomButton id="subButton" role="sub">
        SubTest
      </BottomButton>
      <BottomButton id="disabledButton" role="main" disabled={true}>
        DisableTest
      </BottomButton>
      <Header home={false} back={false}>
        FalseFalse
      </Header>
      <Header home={true} back={false}>
        TrueFalse
      </Header>
      <Header home={false} back={true}>
        FalseTrue
      </Header>
      <Header home={true} back={true}>
        TrueTrue
      </Header>
      <NavigationBar selected={"more"}></NavigationBar>
      <CarInfoBox
        phase={"before"}
        type={"포터2"}
        capacity={"1톤"}
        volumn={"10 X 15 X 3 M"}
      ></CarInfoBox>
      <Toast top={200} type={"error"}>
        에러!
      </Toast>
      <Toast top={200} type={"warning"}>
        경고!
      </Toast>
      <Toast top={200} type={"success"}>
        성공!
      </Toast>
      <Toast type={"info"}>정보!</Toast>
      Test
    </>
  );
};

export default TestView;
