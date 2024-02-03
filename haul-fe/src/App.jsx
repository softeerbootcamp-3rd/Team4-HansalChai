import Router from "./routes/Router.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import { ThemeProvider } from "styled-components";
import theme from "./assets/theme/Theme.jsx";
import "./assets/fonts/fonts.css";
import MobileLayout from "./components/MobileLayout.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MobileLayout>
        <Router />
      </MobileLayout>
    </ThemeProvider>
  );
}

export default App;
