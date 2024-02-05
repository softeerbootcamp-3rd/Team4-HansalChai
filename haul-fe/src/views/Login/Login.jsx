import MobileLayout from "../../components/MobileLayout/MobileLayout";
import Typography from "../../components/Typhography/Typhography";
import Flex from "../../components/Flex/Flex";
import Margin from "../../components/Margin/Margin";
import Input from "../../components/Input/Input";
import { useRef } from "react";

const Login = () => {
  const tel = useRef("");
  const password = useRef("");

  return (
    <MobileLayout>
      <Margin height="40px" />
      <Flex kind="flexCenter">
        <Typography font="bold32">HAUL YOUR NEED</Typography>
      </Flex>
      <Margin height="83px" />
      <Typography font="bold24">로그인 하기</Typography>
      <Margin height="10px" />
      <Typography font="bold16" color="subColor">
        또는 회원가입하기
      </Typography>
      <Margin height="36px" />
      <Input
        size="big"
        type="tel"
        placeholder="Phone Number "
        inputValue={tel}
      />
      <Margin height="20px" />
      <Input
        size="big"
        type="password"
        placeholder="Password "
        inputValue={password}
      />
    </MobileLayout>
  );
};

export default Login;
