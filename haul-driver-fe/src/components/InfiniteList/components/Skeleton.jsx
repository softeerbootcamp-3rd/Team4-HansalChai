import styled, { keyframes } from "styled-components";
import { MaxDeviceWidth } from "../../../data/GlobalVariable.js";
import UnderBar from "../../UnderBar/UnderBar.jsx";
import Margin from "../../Margin/Margin.jsx";

const LoadingAnimation = keyframes`
  0% {
    transform: translateX(calc(-10%));
  }
  100% {
    transform: translateX(calc(${MaxDeviceWidth}));
  }
`;

const CardSkeletonFrame = styled.div`
  width: 100%;
  height: 170px;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: start;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 15px;
  cursor: default;
  position: relative;
`;

const CardSkeletonUpperLine = styled.div`
  width: 100%;
  height: 52px;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cardBackground};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${LoadingAnimation} 2s infinite linear;
  }
`;

const CardSkeletonLowerLine = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cardBackground};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${LoadingAnimation} 2s infinite linear;
  }
`;

const Skeleton = () => {
  return (
    <CardSkeletonFrame>
      <CardSkeletonUpperLine />
      <Margin height="24px" />
      <UnderBar />
      <Margin height="24px" />
      <CardSkeletonLowerLine />
    </CardSkeletonFrame>
  );
};

export default Skeleton;
