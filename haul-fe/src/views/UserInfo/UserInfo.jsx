import Header from "../../components/Header/Header.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import styled from "styled-components";
import Typography from "../../components/Typhography/Typhography.jsx";
import UnderBar from "../../components/UnderBar/UnderBar.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import { useState, useRef } from "react";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";

//TODO: 비밀번호 상세 규칙 통일할 것!!!!!!
//TODO: 상세 규칙 정하고 정규식 바꾼 후 util로 보낼 것!!!!!!!
const checkPassword = password => {
  if (password.length !== password.trim().length)
    return { result: false, message: "비밀번호는 공백을 포함할 수 없습니다" };
  if (password.length < 8)
    return { result: false, message: "비밀번호는 8자 이상이어야 합니다" };
  if (password.length > 20)
    return { result: false, message: "비밀번호는 20자 이하여야 합니다" };
  /*
    const reg = new RegExp(
    "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$"
  );
  if (!reg.test(password)) {
    return {
      result: false,
      message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다",
    };
  }
  */
  return { result: true, message: "" };
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

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: "하울",
    email: "haul@haul.com",
    tel: "010-0000-0000"
  });
  const userRef = useRef(userInfo.name);
  const emailRef = useRef(userInfo.email);
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const passwordPassedRef = useRef("");
  const passwordPassedConfirmRef = useRef("");

  const [isEdit, setIsEdit] = useState(false);

  const clickEditBtn = () => {
    setIsEdit(true);
  };
  const clickSaveBtn = () => {
    setIsEdit(false);
    //TODO: 저장 로직 만들 것!!!!!!
    setUserInfo({
      ...userInfo,
      name: userRef.current,
      email: emailRef.current
    });
  };

  return (
    <MobileLayout>
      <Margin height="10px" />
      <Header home={true} back={true}>
        <Typography font={"semiBold24"}>더보기</Typography>
      </Header>
      <Margin height="32px" />
      {isEdit ? (
        <>
          <Flex kind="flexColumn">
            <ListItem id={"user-info__name"}>
              <TextLabel align={"left"} htmlFor={"userName"}>
                이름
              </TextLabel>
              <TextInput
                id={"userName"}
                defaultValue={userInfo.name}
                onBlur={e => {
                  const newUserName = e.target.value;
                  if (newUserName.trim().length !== 0)
                    userRef.current = newUserName;
                  //TODO: "이름을 적어주세요" 를 참일 때 띄우기
                }}
              />
            </ListItem>
            <UnderBar />
            <ListItem id={"user-info__email"}>
              <TextLabel align={"left"} htmlFor={"userEmail"}>
                이메일
              </TextLabel>
              <TextInput
                id={"userEmail"}
                defaultValue={userInfo.email}
                onBlur={e => {
                  const newUserEmail = e.target.value;
                  if (newUserEmail.trim().length !== 0)
                    emailRef.current = newUserEmail;
                  //TODO: "이메일을 적어주세요" 를 참일 때 띄우기
                }}
              />
            </ListItem>
            <UnderBar />
            <ListItem id={"user-info__new-password"}>
              <TextLabel align={"left"} htmlFor={"password"}>
                새 비밀번호
              </TextLabel>
              <TextInput
                placeholder="●●●●●●"
                id={"password"}
                onBlur={e => {
                  passwordRef.current = e.target.value;
                  const report = checkPassword(passwordRef.current);
                  if (report.result)
                    passwordPassedRef.current = passwordRef.current;
                  //TODO: result가 실패일 시 report.message 에 담긴 내용 띄우기
                }}
              />
            </ListItem>
            <UnderBar />
            <ListItem id={"user-info__new-password-confirm"}>
              <TextLabel align={"left"} htmlFor={"passwordConfirm"}>
                비밀번호 확인
              </TextLabel>
              <TextInput
                placeholder="●●●●●●"
                id={"passwordConfirm"}
                onBlur={e => {
                  passwordConfirmRef.current = e.target.value;
                  if (passwordRef.current === passwordConfirmRef.current)
                    passwordPassedConfirmRef.current = passwordRef.current;
                  //TODO: 거짓일 시 "비밀번호가 일치하지 않습니다." 띄우기
                }}
              />
            </ListItem>
            <UnderBar />
          </Flex>
          <FixedCenterBox bottom={"30px"}>
            <BottomButton onClick={clickSaveBtn} role="main">
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
              수정하기
            </BottomButton>
          </FixedCenterBox>
        </>
      )}
    </MobileLayout>
  );
};

export default UserInfo;
