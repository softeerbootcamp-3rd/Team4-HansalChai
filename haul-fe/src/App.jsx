import Router from "./routes/Router.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme/Theme.jsx";
import "./assets/fonts/fonts.css";
import ToastRoot from "./components/Toast/ToastRoot.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
      <ToastRoot />
    </ThemeProvider>
  );
}

export default App;
