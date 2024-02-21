import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import { IoIosArrowForward as ArrowIcon } from "react-icons/io";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import styled from "styled-components";
import Typography from "../../../components/Typhography/Typhography.jsx";
import UnderBar from "../../../components/UnderBar/UnderBar.jsx";
import { useNavigate } from "react-router-dom";
import {
  isMemberLogin,
  notMemberLogoutFun
} from "../../../utils/localStorage.js";
import { UrlMap } from "../../../data/GlobalVariable.js";

const ListItem = styled.div`
  width: 100%;
  height: 52px;
  cursor: pointer;
  ${({ theme }) => theme.flex.flexBetweenAlignCenter};
`;

const More = () => {
  const navigate = useNavigate();

  const clickUserInfo = () => {
    navigate(UrlMap.moreUserInfoPageUrl);
  };

  const clickUserPayment = () => {
    navigate(UrlMap.moreUserPayments);
  };

  const clickTerms = () => {
    navigate(UrlMap.moreUserTems);
  };

  const clickLogin = () => {
    notMemberLogoutFun();
    navigate(UrlMap.loginPageUrl);
  };

  return (
    <MobileLayout>
      <Header home={false} back={false}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          더보기
        </Typography>
      </Header>
      <Margin height="32px" />
      {!isMemberLogin() && (
        <>
          <ListItem id={"more__login"} onClick={clickLogin}>
            <Typography font={"medium16"}>로그인하기</Typography>
            <ArrowIcon />
          </ListItem>
          <UnderBar />
        </>
      )}
      <Flex kind="flexColumn">
        {isMemberLogin() && (
          <>
            <ListItem id={"more__user-info"} onClick={clickUserInfo}>
              <Typography font={"medium16"}>내 정보</Typography>
              <ArrowIcon />
            </ListItem>
            <UnderBar />
            <ListItem id={"more__user-payment"} onClick={clickUserPayment}>
              <Typography font={"medium16"}>내 결제수단</Typography>
              <ArrowIcon />
            </ListItem>
            <UnderBar />
          </>
        )}
        <ListItem id={"more__terms"} onClick={clickTerms}>
          <Typography font={"medium16"}>약관 및 정책</Typography>
          <ArrowIcon />
        </ListItem>
        <UnderBar />
      </Flex>
      <NavigationBar selected="more" />
    </MobileLayout>
  );
};

export default More;
