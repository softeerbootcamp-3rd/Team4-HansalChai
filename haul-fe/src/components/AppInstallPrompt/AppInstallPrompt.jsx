import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Flex from "../Flex/Flex.jsx";
import Margin from "../Margin/Margin.jsx";
import ToastMaker from "../Toast/ToastMaker.jsx";
import Typography from "../Typhography/Typhography.jsx";
import TypographySpan from "../Typhography/TyphographySpan.jsx";
import { MaxDeviceWidth } from "../../data/GlobalVariable.js";
import { getDeviceInfo } from "../../utils/helper.js";
import { getNotInstall, setNotInstall } from "../../utils/localStorage.js";

const MobileInstallPrompt = () => {
  const deviceInfo = useRef(getDeviceInfo());

  const [showInstallModal, setShowInstallModal] = useState(
    getNotInstall() !== "true" && window.diferredPrompt
  );
  const modalRef = useRef();
  const [manual, setManual] = useState(false);
  const before = event => {
    if (getNotInstall() === "true") return;
    event.preventDefault();
    window.diferredPrompt = event;
    setShowInstallModal(true);
  };

  const installed = () => {
    ToastMaker({ type: "success", children: "앱이 설치되었습니다." });
    window.deferredPrompt = null;
  };

  useEffect(() => {
    if (getNotInstall() === "true") return;
    if (window.navigator.standalone) return;
    window.addEventListener("appinstalled", installed);
    if (deviceInfo.current.device === "iOS") {
      //iOS는 직접 설치해야 함
      setManual(true);
      setShowInstallModal(true);
    }
    if (
      deviceInfo.current.device === "Android" &&
      deviceInfo.current.browser === "firefox"
    ) {
      //Android Firefox는 beforeinstallprompt 이벤트가 발생하지 않음
      if (window.navigator.standalone) return;
      setManual(true);
      setShowInstallModal(true);
    } else if (deviceInfo.current.browser === "chrome") {
      //Chrome
      if (window.navigator.standalone) return;
    } else {
      // PWA Not Supported
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", before);
      window.removeEventListener("appinstalled", installed);
    };
  }, []);

  //Modal Animation
  useEffect(() => {
    modalRef.current.style.transform = showInstallModal
      ? "translate(-50%, 0%)"
      : "translate(-50%, 150%)";
  }, [showInstallModal]);

  const handleInstall = async () => {
    window.diferredPrompt.prompt();
    setShowInstallModal(false);
    await window.diferredPrompt.userChoice;
    setNotInstall();
    window.diferredPrompt = null;
  };

  const handleClose = () => {
    setShowInstallModal(false);
    setNotInstall();
  };

  const getMessage = () => {
    let message = "";
    if (deviceInfo.current.device === "iOS")
      message = "iOS에서는 홈 화면에 추가 버튼을 눌러 설치할 수 있어요";
    else if (
      deviceInfo.current.device === "Android" &&
      deviceInfo.current.browser === "firefox"
    )
      message = "Firefox에서는 메뉴에서 설치 버튼을 눌러 설치할 수 있어요";
    else if (deviceInfo.current.browser === "chrome")
      message = "Haul을 좀 더 빠르고 편하게 이용해보세요";
    return message;
  };

  return (
    <InstallPrompt ref={modalRef} display={showInstallModal ? "" : "none"}>
      <Margin height="20px" />
      <CustomFlex kind="flexBetweenCenter" padding={"0 20px"}>
        <IconImage src="/icon_x192.png" width={72} alt="icon" />
        <CustomFlex kind="flexColumnCenter" just="end">
          <Typography color="black" font="bold20">
            <TypographySpan color="mainColor" font="semiBold20">
              Haul
            </TypographySpan>
            을 설치하시겠어요?
          </Typography>
          <Margin height="4px" />
          <Typography font="regular12" color="gray">
            {getMessage()}
          </Typography>
        </CustomFlex>
      </CustomFlex>
      <Margin height="20px" />
      {manual ? (
        <CustomFlex kind="flexColumnCenter">
          <PromptButton
            onClick={handleClose}
            role="cancel"
            width="calc(100% - 40px)"
          >
            확인
          </PromptButton>
        </CustomFlex>
      ) : (
        <CustomFlex kind="flexBetweenCenter" padding={"0 20px"} gap={"10px"}>
          <PromptButton
            id={"installButton"}
            onClick={handleInstall}
            role="install"
          >
            설치할래요
          </PromptButton>
          <PromptButton onClick={handleClose} role="cancel">
            웹으로 볼래요
          </PromptButton>
        </CustomFlex>
      )}
      <Margin height="20px" />
    </InstallPrompt>
  );
};

export default MobileInstallPrompt;

const InstallPrompt = styled.div`
  position: fixed;
  bottom: 0%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 150%);
  transition: transform 0.3s;
  max-width: ${MaxDeviceWidth};
  border-radius: 16px 16px 0 0;
  border: 0px solid #000;
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
  gap: ${({ gap }) => gap ?? "unset"};
  align-items: ${({ just }) => just};
`;

const PromptButton = styled.button`
  width: ${({ width }) => width ?? "100%"};
  padding: 10px;
  border: none;
  border-radius: 8px;
  ${({ theme }) => theme.font.medium16};
  background-color: ${({ theme, role }) =>
    theme.colors[role === "install" ? "mainColor" : "subColor"]};
  color: #fff;
`;
