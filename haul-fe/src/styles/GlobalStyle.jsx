import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #root {
      width: 100vw;
      height: 100vh;
      background-color: white;
      font-family: "regular";
      ::-webkit-scrollbar {
        display: none;
      }
  }
  
  html{
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
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
    min-width: 0;
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
  
  img {
    border: none;
    background-repeat: no-repeat;
  }

  input[type='radio'],
  input[type='radio']:checked {
  appearance: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  margin-right: 0.1rem;
  } 

  select{
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

export default GlobalStyle;
