import styled from "styled-components";
import theme from "../styles/theme/Theme.jsx";
import { CgChevronLeft } from "react-icons/cg";
import Margin from "./Margin/Margin.jsx";
import Home from "../assets/svgs/Home.svg";

const HeaderFrame = styled.div`
  width: 100%;
  height: 36px;
  ${theme.flex.flexBetween};
  font-family: "bold";
  font-size: 24px;
`;

const LeftHeaderFrame = styled.div`
  ${theme.flex.flexCenter};
  gap: 4px;
`;

const HomeImg = styled.img`
  width: 20px;
  height: 20px;
`;

const Header = ({ home = false, back = true, children }) => {
  return (
    <HeaderFrame>
      <LeftHeaderFrame>
        {back ? (
          <>
            <CgChevronLeft /> <Margin width="4px" />
          </>
        ) : (
          <></>
        )}
        {children}
      </LeftHeaderFrame>
      {home ? <HomeImg src={Home} /> : ""}
    </HeaderFrame>
  );
};

export default Header;
