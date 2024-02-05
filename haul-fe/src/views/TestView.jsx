import styled from "styled-components";
import BottomButton from "../components/BottomButton.jsx";
import Header from "../components/Header.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import CarInfoBox from "../components/CarInfoBox.jsx";

const TestView = () => {
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
      Test
    </>
  );
};

export default TestView;
