import styled from "styled-components";
import theme from "../styles/theme/Theme";

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

const CgChevronLeft = () => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="30px"
    width="30px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
      fill="currentColor"
    ></path>
  </svg>
);

const CgHome = ({}) => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
      fill="currentColor"
    ></path>
  </svg>
);

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
