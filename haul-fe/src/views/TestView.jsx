import styled from "styled-components";
import BottomButton from "../components/BottomButton";

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
      Test
    </>
  );
};

export default TestView;
