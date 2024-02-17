import { useRef, useState } from "react";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../components/Typhography/TyphographySpan.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Input from "../../components/Input/Input.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import { ErrorMessageMap } from "../../data/GlobalVariable.js";
import { isPhoneNumber, deleteDash, isValueArr } from "../../utils/helper.js";
import ToastMaker from "../../components/Toast/ToastMaker.jsx";
import { useNavigate } from "react-router-dom";
import { UrlMap } from "../../data/GlobalVariable.js";

const Login = () => {
  const navigate = useNavigate();
  const tel = useRef("");
  const password = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  function checkLoginAbled() {
    const checkIsButtonDisabled = !isValueArr([
      tel.current.trim(),
      password.current.trim()
    ]);
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(checkIsButtonDisabled);
    }
  }

  //로그인 버튼 클릭 시 실행 함수
  function loginBtnFun() {
    //전화번호 형식 예외처리
    if (!isPhoneNumber(tel.current)) {
      ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
      return;
    }
    tel.current = deleteDash(tel.current);
    navigate(UrlMap.scheduleCreateDetailPageUrl);
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
      <Typography font="bold16" color="subColor">
        안녕하세요 기사님. 좋은 하루입니다.
      </Typography>
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
      </FixedCenterBox>
    </MobileLayout>
  );
};

export default Login;
