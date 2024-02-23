
import styled from "styled-components";
import Flex from "../Flex/Flex.jsx";
import Margin from "../Margin/Margin.jsx";
import Typography from "../Typhography/Typhography.jsx";
import TypographySpan from "../Typhography/TyphographySpan.jsx";
import { MaxDeviceWidth } from "../../data/GlobalVariable.js";

const InstallPrompt = styled.dialog`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${MaxDeviceWidth};
  border-radius: 16px 16px 0 0;
  border: 1px solid #000;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 -10px 10px 1px rgba(0, 0, 0, 0.1);
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`;

const CustomFlex = styled(Flex)`
  padding: ${({ padding }) => padding};
  gap: ${({gap}) => gap ?? "unset"};
`;

const PromptButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  ${({ theme }) => theme.font.medium16};
  background-color: ${({ theme, role }) =>
    theme.colors[role === "install" ? "mainColor" : "subColor"]};
  color: #fff;
`;

const MobileInstallPrompt = ({
  handleInstallClick,
  handleCancelClick,
  isOpen
}) => {
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

  return (
    <InstallPrompt open={isOpen}>
      <Margin height="20px" />
      <CustomFlex kind="flexBetweenCenter" padding={"0 20px"}>
        <IconImage src="/icon_x192.png" width={72} alt="icon" />
        <Typography color="black" font="bold20">
          <TypographySpan color="mainColor" font="semiBold20">
            Haul
          </TypographySpan>
          을 설치하시겠어요?
        </Typography>
      </CustomFlex>
      <Margin height="20px" />
      {isDeviceIOS ? (
        <CustomFlex kind="flexColumnCenter">
          <Typography font="semiBold14">
            IOS에서는 홈 화면에 추가 버튼을 눌러 설치할 수 있어요.
          </Typography>
          <Margin height="20px" />
          <PromptButton onClick={handleCancelClick} role="cancel">
            확인
          </PromptButton>
        </CustomFlex>
      ) : (
        <CustomFlex kind="flexBetweenCenter" padding={"0 20px"} gap={"10px"}>
          <PromptButton
            id={"installButton"}
            onClick={handleInstallClick}
            role="install"
          >
            설치할래요
          </PromptButton>
          <PromptButton onClick={handleCancelClick} role="cancel">
            웹으로 볼래요
          </PromptButton>
        </CustomFlex>
      )}
      <Margin height="20px" />
    </InstallPrompt>
  )
}

export default MobileInstallPrompt;
