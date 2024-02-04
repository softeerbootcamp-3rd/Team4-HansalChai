import styled from "styled-components";
import BottomButton from "../components/BottomButton";
import Header from "../components/Header";

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
      Test
    </>
  );
};

export default TestView;
