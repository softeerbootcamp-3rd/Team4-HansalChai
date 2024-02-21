import { useRef, useState } from "react";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../components/Header/Header.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import Input from "../../components/Input/Input.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import { checkEmail, isPhoneNumber } from "../../utils/helper.js";
import { useNavigate } from "react-router-dom";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline
} from "react-icons/io";
import ToastMaker from "../../components/Toast/ToastMaker.jsx";
import { UrlMap, ErrorMessageMap } from "../../data/GlobalVariable.js";
import { signUpFun } from "../../repository/userRepository.js";

const SignUp = () => {
  const navigate = useNavigate();
  const name = useRef("");
  const tel = useRef("");
  const email = useRef("");
  const password = useRef("");
  const checkPassword = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isSamePassword, setSamePassword] = useState(false);
  const [isEmailForm, setEmailForm] = useState(false);

  const isAllWriteFun = () => {
    const checkIsButtonDisabled = !(
      name.current.trim() &&
      tel.current.trim() &&
      email.current.trim() &&
      password.current.trim() &&
      checkPassword.current.trim()
    );
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(checkIsButtonDisabled);
    }
  };

  const checkSamePasswordFun = () => {
    const checkSamePassword = checkPassword.current === password.current;
    if (checkSamePassword !== isSamePassword) {
      setSamePassword(checkSamePassword);
    }
  };

  const SignUpBtnFun = async () => {
    if (!isPhoneNumber(tel.current)) {
      ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
      return;
    }
    if (!isEmailForm) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.InvalidEmailformat
      });
      return;
    }
    if (password.current.length < 8) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.IsNotMinPasswordCount
      });
      return;
    }
    if (!isSamePassword) {
      ToastMaker({ type: "error", children: ErrorMessageMap.NotSamePassword });
      return;
    }

    const { success, code } = await signUpFun({
      name: name.current,
      tel: tel.current,
      password: password.current,
      email: email.current
    });

    if (success) {
      navigate(UrlMap.loginPageUrl);
    } else {
      if (code === 2004) {
        ToastMaker({
          type: "error",
          children: ErrorMessageMap.ExistingPhoneNumberError
        });
      } else
        ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
    }
  };

  return (
    <MobileLayout>
      <Margin height="10px" />
      <Header>회원가입</Header>
      <Margin height="38px" />
      <form>
        <Typography font="semiBold20">이름</Typography>
        <Margin height="10px" />
        <Input
          size="big"
          type="text"
          placeholder="Your Name"
          onChange={({ target: { value } }) => {
            name.current = value;
            isAllWriteFun();
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
            isAllWriteFun();
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
            const checkEmailForm = checkEmail(email.current);
            if (checkEmailForm !== isEmailForm) {
              setEmailForm(checkEmailForm);
            }
            isAllWriteFun();
          }}
        />

        <Margin height="10px" />
        {isEmailForm ? (
          <Flex kind="flexRowAlignCenter">
            <IoIosCheckmarkCircleOutline
              size={"15px"}
              style={{ marginRight: "2px" }}
              color="#0D9276"
            />
            <Typography font="medium12" color="successGreen">
              이메일: 사용가능한 이메일 형식입니다.
            </Typography>
          </Flex>
        ) : (
          <Flex kind="flexRowAlignCenter">
            <IoIosCloseCircleOutline
              size={"15px"}
              color="#D83B3B"
              style={{ marginRight: "2px" }}
            />
            <Typography font="medium12" color="alertRed">
              이메일: 이메일 형식이 아닙니다.
            </Typography>
          </Flex>
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
            checkSamePasswordFun();
            isAllWriteFun();
          }}
        />
        <Margin height="10px" />
        <Input
          size="big"
          type="password"
          placeholder="Confirm Password"
          onChange={({ target: { value } }) => {
            checkPassword.current = value;
            checkSamePasswordFun();
            isAllWriteFun();
          }}
        />
        <Margin height="10px" />
        {(password.current || checkPassword.current) &&
          (isSamePassword ? (
            <Flex kind="flexRowAlignCenter">
              <IoIosCheckmarkCircleOutline
                size={"15px"}
                style={{ marginRight: "2px" }}
                color="#0D9276"
              />
              <Typography font="medium12" color="successGreen">
                비밀번호: 비밀번호가 일치합니다.
              </Typography>
            </Flex>
          ) : (
            <Flex kind="flexRowAlignCenter">
              <IoIosCloseCircleOutline
                size={"15px"}
                color="#D83B3B"
                style={{ marginRight: "2px" }}
              />
              <Typography font="medium12" color="alertRed">
                비밀번호: 비밀번호가 일치하지 않습니다.
              </Typography>
            </Flex>
          ))}
      </form>
      <FixedCenterBox bottom="30px">
        <BottomButton
          type="submit"
          role="main"
          disabled={!isSamePassword || isButtonDisabled}
          onClick={() => {
            SignUpBtnFun();
          }}
        >
          가입하기
        </BottomButton>
      </FixedCenterBox>

      <Margin height="100px" />
    </MobileLayout>
  );
};

export default SignUp;
