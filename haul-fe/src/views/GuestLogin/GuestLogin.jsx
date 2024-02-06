import MobileLayout from "../../components/MobileLayout/MobileLayout";
import Margin from "../../components/Margin/Margin";
import Typography from "../../components/Typhography/Typhography";
import Flex from "../../components/Flex/Flex";
import Input from "../../components/Input/Input";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox";
import BottomButton from "../../components/Button/BottomButton";
import { useRef, useState } from "react";

const GuestLogin = () => {
  const name = useRef("");
  const tel = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  return (
    <MobileLayout>
      <Margin height="40px" />
      <Flex kind="flexCenter">
        <Typography font="bold32">
          HAUL YOUR NEED<span style={{ color: "#596FB7" }}>.</span>
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
          let checkIsButtonDisabled = !(name.current && tel.current);
          if (checkIsButtonDisabled !== isButtonDisabled) {
            setButtonDisabled(checkIsButtonDisabled);
          }
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
          let checkIsButtonDisabled = !(name.current && tel.current);
          if (checkIsButtonDisabled !== isButtonDisabled) {
            setButtonDisabled(checkIsButtonDisabled);
          }
        }}
      />

      <FixedCenterBox bottom="30px">
        <BottomButton role="main" disabled={isButtonDisabled}>
          정보 입력 완료
        </BottomButton>
        <Margin height="10px" />
      </FixedCenterBox>
      <Margin height="100px" />
    </MobileLayout>
  );
};

export default GuestLogin;
