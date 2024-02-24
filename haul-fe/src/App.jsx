import { ThemeProvider } from "styled-components";
import "./assets/fonts/fonts.css";
import Router from "./routes/Router.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import theme from "./styles/theme/Theme.jsx";
import ToastRoot from "./components/Toast/ToastRoot.jsx";
import { ReservationStoreProvider } from "./store/reservationStore.jsx";
import MobileInstallPrompt from "./components/AppInstallPrompt/MobileInstallPrompt.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReservationStoreProvider>
        <GlobalStyle />
        <Router />
        <ToastRoot />
      </ReservationStoreProvider>
      <MobileInstallPrompt />
    </ThemeProvider>
  );
}

export default App;
