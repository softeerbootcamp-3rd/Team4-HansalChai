import styled from "styled-components";
import { CgChevronLeft } from "react-icons/cg";
import Margin from "./Margin/Margin.jsx";
import Home from "../assets/svgs/Home.svg";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderFrame = styled.div`
  width: 100%;
  height: 36px;
  ${(props) => props.theme.flex.flexBetween};
  font-family: "bold";
  font-size: 24px;
`;

const LeftHeaderFrame = styled.div`
  ${(props) => props.theme.flex.flexCenter};
  gap: 4px;
`;

const HomeImg = styled.img`
  width: 20px;
  height: 20px;
`;

const Header = ({ home = false, back = true, children }) => {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const clickBack = () => {
    navigator(-1);
  };
  const clickHome = () => {
    const path = "/" + pathname.slice(1).split("/")[0];
    navigator(path);
  };

  return (
    <HeaderFrame>
      <LeftHeaderFrame>
        {back ? (
          <>
            <CgChevronLeft onClick={clickBack} /> <Margin width="4px" />
          </>
        ) : (
          <></>
        )}
        {children}
      </LeftHeaderFrame>
      {home ? <HomeImg src={Home} onClick={clickHome} /> : ""}
    </HeaderFrame>
  );
};

export default Header;
