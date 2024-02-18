import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import styled from "styled-components";
import Typography from "../../../components/Typhography/Typhography.jsx";
import UnderBar from "../../../components/UnderBar/UnderBar.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import { useState } from "react";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import { useNavigate } from "react-router-dom";

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

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: "하울",
    email: "haul@haul.com",
    tel: "010-0000-0000"
  });

  const navigate = useNavigate();

  const clickLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <MobileLayout>
      <Header home={true} back={true}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          더보기
        </Typography>
      </Header>
      <Margin height="32px" />
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
        <BottomButton onClick={clickLogout} role="sub">
          로그아웃
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};

export default UserInfo;
