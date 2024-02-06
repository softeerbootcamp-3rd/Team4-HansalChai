import MobileLayout from "../../components/MobileLayout/MobileLayout";
import Typography from "../../components/Typhography/Typhography";
import Flex from "../../components/Flex/Flex";
import Margin from "../../components/Margin/Margin";
import Input from "../../components/Input/Input";
import BottomButton from "../../components/Button/BottomButton";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox";
import styled from "styled-components";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GoSignUpBtn = styled.button`
  width: auto;
  display: flex;
  line-height: 14px;
`;

const Login = () => {
  const navigate = useNavigate();

  const tel = useRef("");
  const password = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  return (
    <MobileLayout>
      <Margin height="40px" />
      <Flex kind="flexCenter">
        <Typography font="bold32">
          {" "}
          HAUL YOUR NEED<span style={{ color: "#596FB7" }}>.</span>
        </Typography>
      </Flex>
      <Margin height="83px" />
      <Typography font="bold24">로그인 하기</Typography>

      <Margin height="10px" />
      <GoSignUpBtn
        onClick={() => {
          navigate("/signUp");
        }}
      >
        <Typography font="bold16" color="subColor">
          또는 회원가입하기
        </Typography>
        <FaArrowRight
          style={{
            fontSize: "14px",
            color: "#596FB7",
            marginLeft: "3px",
          }}
        />
      </GoSignUpBtn>

      <Margin height="36px" />
      <Input
        size="big"
        type="tel"
        placeholder="Phone Number "
        onChange={({ target: { value } }) => {
          tel.current = value;
          let checkIsButtonDisabled = !(tel.current && password.current);
          if (checkIsButtonDisabled !== isButtonDisabled) {
            setButtonDisabled(checkIsButtonDisabled);
          }
        }}
      />
      <Margin height="20px" />
      <Input
        size="big"
        type="password"
        placeholder="Password "
        onChange={({ target: { value } }) => {
          password.current = value;
          let checkIsButtonDisabled = !(tel.current && password.current);
          if (checkIsButtonDisabled !== isButtonDisabled) {
            setButtonDisabled(checkIsButtonDisabled);
          }
        }}
      />

      <FixedCenterBox bottom="30px">
        <BottomButton
          role="main"
          disabled={isButtonDisabled}
          onClick={() => {
            navigate("/haulRequest/choiceTransport");
          }}
        >
          로그인하기
        </BottomButton>
        <Margin height="10px" />
        <BottomButton
          role="sub"
          disabled={false}
          onClick={() => {
            navigate("/guestLogin");
          }}
        >
          비회원으로 접속하기
        </BottomButton>
      </FixedCenterBox>
      <Margin height="200px" />
    </MobileLayout>
  );
};

export default Login;
