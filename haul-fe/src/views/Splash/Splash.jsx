import React, { useState, useEffect } from "react";
import MobileLayout from "../../components/MobileLayout/MobileLayout";
import Typography from "../../components/Typhography/Typhography";
import styled, { keyframes } from "styled-components";
import Loading from "../../assets/gifs/Loading.gif";
import HaulCar from "../../assets/svgs/HaulCar.svg";
import { useNavigate } from "react-router-dom";

const SplashBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
  animation: ${moveRightAnimation} 3.5s ease-in-out forwards;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-80%);
`;

const AnimatedBox = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Splash = () => {
  const animationDuration = 3.5 * 1000;
  const delayTime = 500;
  const initialText = "YOUR NEED";
  const navigate = useNavigate();
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    const animateText = () => {
      setTimeout(() => {
        for (let i = 0; i <= initialText.length; i++) {
          setTimeout(() => {
            setAnimatedText(initialText.substring(0, i));
          }, i * 250);
        }
      }, delayTime);
    };
    animateText();

    setTimeout(() => {
      navigate("/login");
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
