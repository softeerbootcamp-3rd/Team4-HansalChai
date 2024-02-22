import styled from "styled-components";
import Flex from "../../../../components/Flex/Flex.jsx";
import UnderBar from "../../../../components/UnderBar/UnderBar.jsx";
import FixedCenterBox from "../../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../../components/Button/BottomButton.jsx";
import Margin from "../../../../components/Margin/Margin.jsx";
import { logoutFun } from "../../../../utils/localStorage.js";
import { UrlMap } from "../../../../data/GlobalVariable.js";

const ViewForm = ({ userInfo, setIsEdit, navigate }) => {
  const clickEditBtn = () => {
    setIsEdit(true);
  };

  const clickLogoutBtn = () => {
    logoutFun();
    navigate(UrlMap.loginPageUrl);
  };
  return (
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

export default ViewForm;
