import Router from "./routes/Router.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme/Theme.jsx";
import "./assets/fonts/fonts.css";
import ToastRoot from "./components/Toast/ToastRoot.jsx";
import { StoreProvider } from "./\bstore/store.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <GlobalStyle />
        <Router />
        <ToastRoot />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
