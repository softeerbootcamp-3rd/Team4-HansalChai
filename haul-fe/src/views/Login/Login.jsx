import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../components/Typhography/TyphographySpan.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Input from "../../components/Input/Input.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UrlMap } from "../../data/GlobalVariable.js";
import { setIsMember } from "../../utils/localStorage.js";
import { isMemberLogin } from "../../utils/localStorage.js";
import { checkLoginAbled, loginBtnFun } from "./index.jsx";

const GoSignUpBtn = styled.button`
  width: auto;
  display: flex;
`;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인을 이미 했다면
    if (isMemberLogin()) {
      navigate(UrlMap.choiceTranportTypeUrl);
    }
  }, []);

  const tel = useRef("");
  const password = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  //회원가입 버튼 클릭 시 실행 함수
  function signUpBtnFun() {
    navigate(UrlMap.signUpPageUrl);
  }

  // 비회원으로 접속하기 버튼 클릭 시 실행 함수
  function guestLoginBtnFun() {
    setIsMember(false);
    navigate(UrlMap.choiceTranportTypeUrl);
  }

  return (
    <MobileLayout>
      <Margin height="40px" />
      <Flex kind="flexCenter">
        <Typography font="bold32">
          HAUL YOUR NEED
          <TypographySpan color="subColor">.</TypographySpan>
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
            marginTop: "1px"
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
            checkLoginAbled({
              tel: tel,
              password: password,
              isButtonDisabled: isButtonDisabled,
              setButtonDisabled: setButtonDisabled
            });
          }}
        />
        <Margin height="20px" />
        <Input
          size="big"
          type="password"
          placeholder="Password "
          onChange={({ target: { value } }) => {
            password.current = value;
            checkLoginAbled({
              tel: tel,
              password: password,
              isButtonDisabled: isButtonDisabled,
              setButtonDisabled: setButtonDisabled
            });
          }}
        />
      </form>
      <FixedCenterBox bottom="30px">
        <BottomButton
          type="submit"
          role="main"
          disabled={isButtonDisabled}
          onClick={() => {
            loginBtnFun({ tel: tel, password: password, navigate: navigate });
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
