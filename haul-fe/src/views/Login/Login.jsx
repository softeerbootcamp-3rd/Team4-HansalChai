import { useRef, useState } from "react";
import styled from "styled-components";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import Typography_Span from "../../components/Typhography/Typhography_Span.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Input from "../../components/Input/Input.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UrlMap, ErrorMessageMap } from "../../data/GlobalVariable.js";
import { isPhoneNumber } from "../../utils/helper.js";
import ToastMaker from "../../components/Toast/ToastMaker.jsx";

const GoSignUpBtn = styled.button`
  width: auto;
  display: flex;
`;

const Login = () => {
  const navigate = useNavigate();

  const tel = useRef("");
  const password = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  function checkLoginAbled() {
    let checkIsButtonDisabled = !(tel.current && password.current);
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(checkIsButtonDisabled);
    }
  }

  //회원가입 버튼 클릭 시 실행 함수
  function signUpBtnFun() {
    navigate(UrlMap.signUpPageUrl);
  }

  //로그인 버튼 클릭 시 실행 함수
  function loginBtnFun() {
    //전화번호 형식 예외처리
    if (!isPhoneNumber(tel.current)) {
      ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
      return;
    }
    navigate(UrlMap.choiceTranportTypeUrl);
  }

  // 비회원으로 접속하기 버튼 클릭 시 실행 함수
  function guestLoginBtnFun() {
    navigate(UrlMap.guestLoginPageUrl);
  }

  return (
    <MobileLayout>
      <Margin height="40px" />
      <Flex kind="flexCenter">
        <Typography font="bold32">
          HAUL YOUR NEED
          <Typography_Span color="subColor">.</Typography_Span>
        </Typography>
      </Flex>
      <Margin height="83px" />
      <Typography font="bold24">로그인 하기</Typography>
      <Margin height="10px" />
      <GoSignUpBtn
        onClick={() => {
          signUpBtnFun();
        }}
      >
        <Typography font="bold16" color="subColor">
          또는 회원가입하기
        </Typography>
        <FaArrowRight
          style={{
            fontSize: "14px",
            color: "#446EDA",
            marginLeft: "3px",
            marginTop: "1px",
          }}
        />
      </GoSignUpBtn>
      <Margin height="36px" />
      <form>
        <Input
          size="big"
          type="tel"
          placeholder="Phone Number "
          onChange={({ target: { value } }) => {
            tel.current = value;
            checkLoginAbled();
          }}
        />
        <Margin height="20px" />
        <Input
          size="big"
          type="password"
          placeholder="Password "
          onChange={({ target: { value } }) => {
            password.current = value;
            checkLoginAbled();
          }}
        />
      </form>
      <FixedCenterBox bottom="30px">
        <BottomButton
          type="submit"
          role="main"
          disabled={isButtonDisabled}
          onClick={() => {
            loginBtnFun();
          }}
        >
          로그인하기
        </BottomButton>
        <Margin height="10px" />
        <BottomButton
          role="sub"
          disabled={false}
          onClick={() => {
            guestLoginBtnFun();
          }}
        >
          비회원으로 접속하기
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};

export default Login;
