import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../components/Typhography/TyphographySpan.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import Input from "../../components/Input/Input.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import ToastMaker from "../../components/Toast/ToastMaker.jsx";
import { UrlMap, ErrorMessageMap } from "../../data/GlobalVariable.js";
import { isPhoneNumber } from "../../utils/helper.js";

const GuestLogin = () => {
  const navigate = useNavigate();

  const name = useRef("");
  const tel = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  function checkLoginAbled() {
    const checkIsButtonDisabled = !(name.current.trim() && tel.current.trim());
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(checkIsButtonDisabled);
    }
  }

  //비회원 로그인 버튼 클릭 시 함수 (정보 입력 완료 버튼)
  function guestLoginBtnFun() {
    //전화번호 형식 예외처리
    if (!isPhoneNumber(tel.current)) {
      ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
      return;
    }
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
      <Typography font="bold24" color="subColor">
        비회원 로그인
      </Typography>
      <Margin height="36px" />
      <Typography font="semiBold20">이름</Typography>
      <Margin height="10px" />
      <form>
        <Input
          size="big"
          type="text"
          placeholder="Your Name"
          onChange={({ target: { value } }) => {
            name.current = value;
            checkLoginAbled();
          }}
        />
        <Margin height="20px" />
        <Typography font="semiBold20">전화번호</Typography>
        <Margin height="10px" />
        <Input
          size="big"
          type="tel"
          placeholder="Phone Number"
          onChange={({ target: { value } }) => {
            tel.current = value;
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
            guestLoginBtnFun();
          }}
        >
          정보 입력 완료
        </BottomButton>
        <Margin height="10px" />
      </FixedCenterBox>
      <Margin height="100px" />
    </MobileLayout>
  );
};

export default GuestLogin;
