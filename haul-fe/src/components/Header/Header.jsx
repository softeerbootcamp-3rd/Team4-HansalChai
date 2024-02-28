import styled from "styled-components";
import { CgChevronLeft } from "react-icons/cg";
import Margin from "../Margin/Margin.jsx";
import Home from "../../assets/svgs/HomeIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { UrlMap } from "../../data/GlobalVariable.js";

const HomeMap = {
  "/request": UrlMap.choiceTranportTypeUrl,
  "/check": UrlMap.checkReservationPageUrl,
  "/more": UrlMap.morePageUrl
};

const Header = ({ home = false, back = true, children }) => {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const clickBack = () => {
    navigator(-1);
  };
  const clickHome = () => {
    let path = `/${pathname.slice(1).split("/")[0]}`;
    path = HomeMap[path];
    navigator(path);
  };

  return (
    <HeaderFrame>
      <LeftHeaderFrame>
        {back && (
          <>
            <CgChevronLeft onClick={clickBack} />
            <Margin width="4px" />
          </>
        )}
        {children}
      </LeftHeaderFrame>
      {home && <HomeImg src={Home} onClick={clickHome} />}
    </HeaderFrame>
  );
};

const HeaderFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexBetween};
  align-items: center;
  font-family: "semiBold";
  font-size: 24px;
  margin-top: 20px;
`;

const LeftHeaderFrame = styled.div`
  ${({ theme }) => theme.flex.flexCenter};
  gap: 4px;
`;

const HomeImg = styled.img`
  width: 20px;
  height: 20px;
`;

export default Header;
