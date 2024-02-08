import { useRef, useState } from "react";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../components/Header/Header.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import Input from "../../components/Input/Input.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import { checkEmail } from "../../utils/helper.js";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

const SignUP = () => {
  const name = useRef("");
  const tel = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isSamePassword, setSamePassword] = useState(false);
  const [isEmailForm, setEmailForm] = useState(false);

  const checkSame = () => {
    let checkIsButtonDisabled = !(
      name.current &&
      tel.current &&
      email.current &&
      password.current
    );
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(checkIsButtonDisabled);
    }
  };

  return (
    <MobileLayout>
      <Margin height="10px" />
      <Header>회원가입</Header>

      <Margin height="38px" />
      <Typography font="semiBold20">이름</Typography>
      <Margin height="10px" />
      <Input
        size="big"
        type="text"
        placeholder="Your Name"
        onChange={({ target: { value } }) => {
          name.current = value;
          checkSame();
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
          checkSame();
        }}
      />

      <Margin height="20px" />
      <Typography font="semiBold20">이메일</Typography>
      <Margin height="10px" />
      <Input
        size="big"
        type="email"
        placeholder="Email"
        onChange={({ target: { value } }) => {
          email.current = value;
          let checkEmailForm = checkEmail(email.current);
          if (checkEmailForm !== isEmailForm) {
            setEmailForm(checkEmailForm);
          }
          checkSame();
        }}
      />

      <Margin height="10px" />
      {isEmailForm ? (
        <Typography font="medium12" color="successGreen">
          <IoIosCheckmarkCircleOutline
            size={"15px"}
            style={{ marginRight: "2px" }}
          />
          이메일: 사용가능한 이메일 형식입니다.
        </Typography>
      ) : (
        <Typography font="medium12" color="alertRed">
          <IoIosCloseCircleOutline
            size={"15px"}
            style={{ marginRight: "2px" }}
          />
          이메일: 이메일 형식이 아닙니다.
        </Typography>
      )}

      <Margin height="20px" />
      <Typography font="semiBold20">비밀번호</Typography>
      <Margin height="10px" />
      <Input
        size="big"
        type="password"
        placeholder="Password"
        onChange={({ target: { value } }) => {
          password.current = value;
          checkSame();
        }}
      />
      <Margin height="10px" />
      <Input
        size="big"
        type="password"
        placeholder="Confirm Password"
        onChange={({ target: { value } }) => {
          let checkSamePassword = value === password.current;
          if (checkSamePassword !== isSamePassword) {
            setSamePassword(checkSamePassword);
          }
        }}
      />
      <Margin height="10px" />
      {isSamePassword ? (
        <Typography font="medium12" color="successGreen">
          <IoIosCheckmarkCircleOutline
            size={"15px"}
            style={{ marginRight: "2px" }}
          />
          비밀번호: 비밀번호가 일치합니다.
        </Typography>
      ) : (
        <Typography font="medium12" color="alertRed">
          <IoIosCloseCircleOutline
            size={"15px"}
            style={{ marginRight: "2px" }}
          />
          비밀번호: 비밀번호가 일치하지 않습니다.
        </Typography>
      )}

      <FixedCenterBox bottom="30px">
        <BottomButton
          role="main"
          disabled={!isSamePassword || isButtonDisabled}
        >
          가입하기
        </BottomButton>
      </FixedCenterBox>

      <Margin height="100px" />
    </MobileLayout>
  );
};

export default SignUP;
