import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import "./assets/fonts/fonts.css";
import Router from "./routes/Router.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import theme from "./styles/theme/Theme.jsx";
import ToastRoot from "./components/Toast/ToastRoot.jsx";
import { ReservationStoreProvider } from "./store/reservationStore.jsx";
import MobileInstallPrompt from "./components/AppInstallPrompt/MobileInstallPrompt.jsx";
import ToastMaker from "./components/Toast/ToastMaker.jsx";
import { getNotInstall, setNotInstall } from "./utils/localStorage.js";

function App() {
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    if (getNotInstall() === "true") return;
    const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    if (isDeviceIOS) {
      setShowInstallModal(true);
      return;
    }
    const before = event => {
      event.preventDefault();
      window.diferredPrompt = event;
      setShowInstallModal(true);
      console.log("beforeinstallprompt run!");
    };
    window.addEventListener("beforeinstallprompt", before);

    const installed = event => {
      console.log("👍", "appinstalled", event);
      ToastMaker({ type: "success", message: "앱이 설치되었습니다." });
      // Clear the deferredPrompt so it can be garbage collected
      window.deferredPrompt = null;
    };
    window.addEventListener("appinstalled", installed);

    return () => {
      window.removeEventListener("beforeinstallprompt", before);
      window.removeEventListener("appinstalled", installed);
    };
  }, []);

  const handleInstall = () => {
    console.log(window.diferredPrompt);
    // PWA 설치 로직
    window.diferredPrompt.prompt();
    setShowInstallModal(false);
    const result = window.diferredPrompt.userChoice;
    console.log(result);
    window.diferredPrompt = null;
  };

  const handleClose = () => {
    setShowInstallModal(false);
    setNotInstall();
  };
  return (
    <ThemeProvider theme={theme}>
      <ReservationStoreProvider>
        <GlobalStyle />
        <Router />
        <ToastRoot />
      </ReservationStoreProvider>
      {showInstallModal && (
        <MobileInstallPrompt
          handleInstallClick={handleInstall}
          handleCancelClick={handleClose}
          isOpen={showInstallModal}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
