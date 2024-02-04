import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #root {
      width: 100vw;
      height: 100vh;
      background-color: white;
      font-family: "regular";
  }

  * {
    box-sizing: border-box;
    outline: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  input {
    border: none;
    outline: none;
    background: white;
    :focus {
    outline: none;
    }

    textarea {
      resize: none;
      background: white;
    }
  }

  button {
    border: none;
    outline: none;
    background: none;
  }
`;

export default GlobalStyle;