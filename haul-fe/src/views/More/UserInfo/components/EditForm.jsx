import styled from "styled-components";
import { checkForm, checkPassword } from "../index.jsx";
import Flex from "../../../../components/Flex/Flex.jsx";
import UnderBar from "../../../../components/UnderBar/UnderBar.jsx";
import FixedCenterBox from "../../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../../components/Button/BottomButton.jsx";
import ToastMaker from "../../../../components/Toast/ToastMaker.jsx";
import {
  isTokenInvalid,
  putPassword
} from "../../../../repository/userRepository.js";
import { UrlMap } from "../../../../data/GlobalVariable.js";
import Typography from "../../../../components/Typhography/Typhography.jsx";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Margin from "../../../../components/Margin/Margin.jsx";

const EditForm = ({ navigate, setIsEdit }) => {
  /*
   * 상태를 ternary로 관리
   * 1. null: 아무것도 입력하지 않은 상태
   * 2. true: 올바른 형식으로 입력한 상태
   * 3. false: 올바르지 않은 형식으로 입력한 상태
   */
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(null);
  const [isPasswordConfirmCorrect, setIsPasswordConfirmCorrect] =
    useState(null);
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");

  const savePassword = async () => {
    try {
      const response = await putPassword({ password: passwordRef.current });
      if (!response.success) {
        if (isTokenInvalid(response.code)) navigate(UrlMap.loginPageUrl);
        ToastMaker({ type: "error", children: response.message });
        navigate(-1);
      }
      setIsEdit(false);
      passwordRef.current = "";
      passwordConfirmRef.current = "";
      setIsPasswordConfirmCorrect(null);
      setIsPasswordCorrect(null);
      ToastMaker({ type: "success", children: "비밀번호가 변경되었습니다." });
    } catch (error) {
      ToastMaker({ type: "error", children: error.message });
    }
  };

  const clickSaveBtn = () => {
    const passwordPassed = checkForm({
      password: isPasswordCorrect,
      passwordConfirm: isPasswordConfirmCorrect
    });
    if (passwordPassed) savePassword();
    else if (passwordPassed === null) setIsEdit(false);
    else {
      ToastMaker({
        type: "error",
        children: "비밀번호를 확인해주세요"
      });
    }
  };

  const clickCancelBtn = () => {
    setIsPasswordConfirmCorrect(null);
    setIsPasswordCorrect(null);
    passwordRef.current = "";
    passwordConfirmRef.current = "";
    setIsEdit(false);
  };

  useEffect(() => {
    setIsPasswordConfirmCorrect(null);
    setIsPasswordCorrect(null);
    return () => {
      setIsPasswordConfirmCorrect(null);
      setIsPasswordCorrect(null);
    };
  }, []);

  return (
    <>
      <Flex kind="flexColumn">
        <ListItem id={"user-info__new-password"}>
          <TextLabel align={"left"} htmlFor={"password"}>
            새 비밀번호
          </TextLabel>
          <TextInput
            placeholder="●●●●●●"
            type="password"
            id={"password"}
            onChange={e => {
              passwordRef.current = e.target.value;
              setIsPasswordCorrect(() => checkPassword(passwordRef.current));
              setIsPasswordConfirmCorrect(() => {
                if (isPasswordConfirmCorrect === null) return null;
                return passwordConfirmRef.current === passwordRef.current;
              });
            }}
          />
        </ListItem>
        <InputAdvisor>
          {isPasswordCorrect === null ? (
            <AdvisorText font="medium12" color="successGreen"></AdvisorText>
          ) : isPasswordCorrect.result ? (
            <AdvisorText font="medium12" color="successGreen">
              사용할 수 있는 비밀번호에요
            </AdvisorText>
          ) : (
            <AdvisorText font="medium12" color="alertRed">
              {isPasswordCorrect.message}
            </AdvisorText>
          )}
        </InputAdvisor>
        <UnderBar />
        <ListItem id={"user-info__new-password-confirm"}>
          <TextLabel align={"left"} htmlFor={"passwordConfirm"}>
            비밀번호 확인
          </TextLabel>
          <TextInput
            placeholder="●●●●●●"
            id={"passwordConfirm"}
            type="password"
            onChange={e => {
              passwordConfirmRef.current = e.target.value;
              setIsPasswordConfirmCorrect(
                () => passwordConfirmRef.current === passwordRef.current
              );
            }}
          />
        </ListItem>
        <InputAdvisor>
          {isPasswordConfirmCorrect === null ? (
            <AdvisorText font="medium12" color="successGreen"></AdvisorText>
          ) : isPasswordConfirmCorrect ? (
            <AdvisorText font="medium12" color="successGreen">
              비밀번호가 일치해요
            </AdvisorText>
          ) : (
            <AdvisorText font="medium12" color="alertRed">
              비밀번호를 확인해주세요
            </AdvisorText>
          )}
        </InputAdvisor>
        <UnderBar />
      </Flex>
      <FixedCenterBox bottom={"30px"}>
        <BottomButton onClick={clickSaveBtn} role="main">
          저장하기
        </BottomButton>
        <Margin height="8px" />
        <BottomButton onClick={clickCancelBtn} role="sub">
          취소하기
        </BottomButton>
      </FixedCenterBox>
    </>
  );
};

const ListItem = styled.div`
  width: 100%;
  height: 53px;
  ${({ theme }) => theme.flex.flexBetweenAlignCenter};
`;

const TextLabel = styled.label`
  width: fit-content;
  height: 100%;
  ${({ theme }) => theme.font.medium16};
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.font.medium16};
  text-align: ${({ align }) => (align ? align : "right")};
  white-space: nowrap;
  overflow: visible;
  ${({ theme }) => theme.flex.flexRow};
  align-items: center;
  justify-content: end;
`;

const TextInput = styled.input`
  height: 100%;
  ${({ theme }) => theme.font.medium16};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  outline: none;
  text-align: right;
  flex-grow: 1;
`;

const InputAdvisor = styled.div`
  width: 100%;
  height: fit-content;
  ${({ theme }) => theme.flex.flexRow};
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const AdvisorText = styled(Typography)`
  ${({ theme }) => theme.font.medium12};
  color: ${({ theme, color }) => theme.colors[color]};
  position: absolute;
  bottom: 4px;
`;

export default EditForm;
