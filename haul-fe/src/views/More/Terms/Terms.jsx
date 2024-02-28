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
import { makeNavigator } from "../../../utils/helper.js";

const ListItem = styled.div`
  width: 100%;
  height: 52px;
  cursor: pointer;
  ${({ theme }) => theme.flex.flexBetweenAlignCenter};
`;

const Terms = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <Header home={true} back={true}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          약관 및 정책
        </Typography>
      </Header>
      <Margin height="32px" />
      <Flex kind="flexColumn">
        <ListItem
          id={"more__service"}
          onClick={makeNavigator(navigate, "/more/terms/services")}
        >
          <Typography font={"medium16"}>이용약관</Typography>
          <ArrowIcon />
        </ListItem>
        <UnderBar />
        <ListItem
          id={"more__privacy"}
          onClick={makeNavigator(navigate, "/more/terms/privacy")}
        >
          <Typography font={"medium16"}>개인정보 처리방침</Typography>
          <ArrowIcon />
        </ListItem>
        <UnderBar />
        <ListItem
          id={"more__transportation"}
          onClick={makeNavigator(navigate, "/more/terms/transportation")}
        >
          <Typography font={"medium16"}>화물자동차 운송주선약관</Typography>
          <ArrowIcon />
        </ListItem>
        <UnderBar />
        <ListItem
          id={"more__location"}
          onClick={makeNavigator(navigate, "/more/terms/location")}
        >
          <Typography font={"medium16"}>위치기반서비스 이용약관</Typography>
          <ArrowIcon />
        </ListItem>
        <UnderBar />
      </Flex>
      <NavigationBar selected="more" />
    </MobileLayout>
  );
};

export default Terms;
