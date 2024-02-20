import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import styled from "styled-components";
import Typography from "../../../components/Typhography/Typhography.jsx";
import UnderBar from "../../../components/UnderBar/UnderBar.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import { useState, useRef, useEffect } from "react";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import { logoutFun, setUserName } from "../../../utils/localStorage.js";
import { useNavigate } from "react-router-dom";
import { UrlMap } from "../../../data/GlobalVariable.js";
import {
  getUserProfile,
  isTokenInvalid,
  putPassword
} from "../../../repository/userRepository.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";

//TODO: 비밀번호 상세 규칙 통일할 것!!!!!!
//TODO: 상세 규칙 정하고 정규식 바꾼 후 util로 보낼 것!!!!!!!
const checkPassword = password => {
  if (password.length === 0) return null;
  if (password.trim().length === 0)
    return {
      result: false,
      message: "비밀번호는 공백으로만 이루어질 수는 없습니다."
    };
  if (password.length < 8) {
    return {
      result: false,
      message: "비밀번호는 영문, 숫자, 특수문자를 모두 합하여 8자 이상입니다."
    };
  }
  return { result: true, message: "" };
};

const checkForm = ({ password, passwordConfirm }) => {
  //비밀번호 미 입력 시 변경 안함
  if (password === null && passwordConfirm === null) {
    return false;
  }
  //비밀번호 규칙과 어긋날 시 저장 안함
  if (!(password.result && passwordConfirm)) {
    return false;
  }
  return true;
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

const getUserInfo = async () => {
  const response = await getUserProfile();
  if (!response.success) throw response;
  setUserName(response.data.name);
  return response.data;
};

const UserInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    //더미데이터, 지워야 할까?
    name: "",
    email: "",
    tel: ""
  });
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");

  //
  const [isEdit, setIsEdit] = useState(false);

  /*
   * 상태를 ternary로 관리
   * 1. null: 아무것도 입력하지 않은 상태
   * 2. true: 올바른 형식으로 입력한 상태
   * 3. false: 올바르지 않은 형식으로 입력한 상태
   */
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(null);
  const [isPasswordConfirmCorrect, setIsPasswordConfirmCorrect] =
    useState(null);

  const clickEditBtn = () => {
    setIsEdit(true);
  };

  const clickLogoutBtn = () => {
    logoutFun();
    navigate(UrlMap.loginPageUrl);
  };

  const clickSaveBtn = async () => {
    const response = await putPassword({ password: passwordRef.current });
    if (!response.success) {
      if (isTokenInvalid(response.code)) navigate(UrlMap.loginPageUrl);
      ToastMaker({ type: "error", children: response.message });
      navigate(-1);
    }
    setIsEdit(false);
    setIsPasswordConfirmCorrect(null);
    setIsPasswordCorrect(null);
    ToastMaker({ type: "success", children: "비밀번호가 변경되었습니다." });
  };

  useEffect(() => {
    getUserInfo()
      .then(data => {
        setUserInfo(data);
      })
      .catch(response => {
        if (isTokenInvalid(response.code)) navigate(UrlMap.loginPageUrl);
        ToastMaker({ type: "error", children: response.message });
        navigate(-1);
      });
  }, []);

  return (
    <MobileLayout>
      <Header home={true} back={true}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          더보기
        </Typography>
      </Header>
      <Margin height="32px" />
      {isEdit ? (
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
                  setIsPasswordCorrect(() =>
                    checkPassword(passwordRef.current)
                  );
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
            <BottomButton
              onClick={() => {
                const passwordPassed = checkForm({
                  password: isPasswordCorrect,
                  passwordConfirm: isPasswordConfirmCorrect
                });
                if (passwordPassed) clickSaveBtn();
                else if (passwordPassed === null) setIsEdit(false);
                else {
                  ToastMaker({
                    type: "error",
                    children: "비밀번호를 확인해주세요"
                  });
                }
              }}
              role="main"
            >
              저장하기
            </BottomButton>
          </FixedCenterBox>
        </>
      ) : (
        <>
          <Flex kind="flexColumn">
            <ListItem id={"user-info__name"}>
              <TextLabel align={"left"}>이름</TextLabel>
              <TextLabel>{userInfo.name}</TextLabel>
            </ListItem>
            <UnderBar />
            <ListItem id={"user-info__email"}>
              <TextLabel align={"left"}>이메일</TextLabel>
              <TextLabel>{userInfo.email}</TextLabel>
            </ListItem>
            <UnderBar />
            <ListItem id={"user-info__tel"}>
              <TextLabel align={"left"}>전화번호</TextLabel>
              <TextLabel>{userInfo.tel}</TextLabel>
            </ListItem>
            <UnderBar />
          </Flex>

          <FixedCenterBox bottom={"30px"}>
            <BottomButton onClick={clickEditBtn} role="main">
              비밀번호 변경하기
            </BottomButton>
            <Margin height="8px" />
            <BottomButton onClick={clickLogoutBtn} role="sub">
              로그아웃
            </BottomButton>
          </FixedCenterBox>
        </>
      )}
    </MobileLayout>
  );
};

export default UserInfo;
