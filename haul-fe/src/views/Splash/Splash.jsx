import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import Loading from "../../assets/gifs/Loading.gif";
import HaulCar from "../../assets/svgs/HaulCar.svg";
import { UrlMap } from "../../data/GlobalVariable.js";

const SplashBox = styled.div`
  width: 100%;
  height: 100%;
  ${props => props.theme.flex.flexColumnAroundAlignCenter};
`;

const LoadingImg = styled.img`
  width: 40px;
`;

const moveRightAnimation = keyframes`
   0% {
    transform: translateX(-150%) rotate(-5deg);
  }
  60% {
    transform: translateX(40%) rotate(5deg);
  }
  100% {
    transform: translateX(40%) rotate(0deg);
  }
`;

const LogoImg = styled.img`
  width: 100px;
  position: absolute;
  top: 50px;
  left: 50%;
  animation: ${moveRightAnimation} 3.5s ease-in-out forwards;
  transform: translateX(-80%);
`;

const AnimatedBox = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  ${props => props.theme.flex.flexRowCenter};
`;

const Splash = () => {
  const animationDuration = 3.5 * 1000;
  const delayTime = 500;
  const initialText = "YOUR NEED";
  const navigate = useNavigate();
  const [animatedText, setAnimatedText] = useState("");

  const animateText = () => {
    setTimeout(() => {
      for (let i = 0; i <= initialText.length; i++) {
        setTimeout(() => {
          setAnimatedText(initialText.substring(0, i));
        }, i * 250);
      }
    }, delayTime);
  };

  useEffect(() => {
    animateText();
    setTimeout(() => {
      navigate(UrlMap.loginPageUrl);
    }, animationDuration + delayTime);
  }, []);

  return (
    <MobileLayout color="mainColor">
      <SplashBox>
        <AnimatedBox>
          <Typography font="bold32" color="white">
            HAUL {animatedText}
          </Typography>
          <LogoImg src={HaulCar} />
        </AnimatedBox>
        <LoadingImg src={Loading} />
      </SplashBox>
    </MobileLayout>
  );
};

export default Splash;
