import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import Typography_Span from "../../components/Typhography/Typhography_Span.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import Input from "../../components/Input/Input.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import { UrlMap } from "../../data/GlobalVariable";

const GuestLogin = () => {
  const navigate = useNavigate();

  const name = useRef("");
  const tel = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  function checkLoginAbled() {
    let checkIsButtonDisabled = !(name.current && tel.current);
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(checkIsButtonDisabled);
    }
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
      <Typography font="bold24" color="subColor">
        비회원 로그인
      </Typography>
      <Margin height="36px" />
      <Typography font="semiBold20">이름</Typography>
      <Margin height="10px" />
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
      <FixedCenterBox bottom="30px">
        <BottomButton
          role="main"
          disabled={isButtonDisabled}
          onClick={() => {
            navigate(UrlMap.choiceTranportTypeUrl);
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
