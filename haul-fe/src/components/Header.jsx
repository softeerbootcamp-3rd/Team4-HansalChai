import styled from "styled-components";
import theme from "../styles/theme/Theme";
import { CgChevronLeft, CgHome } from "react-icons/cg";

const HeaderFrame = styled.div`
  width: 100%;
  height: 36px;
  ${theme.flex.flexBetween};
  gap: 4px;
  padding: 0 20px;
  font-family: "bold";
  font-size: 24px;
`;

const LeftHeaderFrame = styled.div`
  ${theme.flex.flexCenter};
  gap: 4px;
`;

const Header = ({ home = false, back = true, children }) => {
  return (
    <HeaderFrame>
      <LeftHeaderFrame>
        {back ? <CgChevronLeft /> : ""} {children}
      </LeftHeaderFrame>
      {home ? <CgHome /> : ""}
    </HeaderFrame>
  );
};

export default Header;
