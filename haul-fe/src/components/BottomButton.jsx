import styled from "styled-components";
import theme from "../styles/theme/Theme";

const ButtonStyle = styled.button`
  width: 100%;
  height: 48px;
  left: 20px;
  background-color: ${(props) =>
    props.role === "main"
      ? theme.colors.mainColor
      : theme.colors.subButtonBackground};
  color: ${(props) =>
    props.role === "main" ? theme.colors.white : theme.colors.mainColor};
  font-family: "bold";
  text-align: center;
  border-radius: 10px;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background-color: ${theme.colors.disabledColor};
    color: ${theme.colors.white};
    &:hover {
      opacity: 1;
    }
  }
`;

const BottomButton = ({
  role,
  disabled = false,
  onClick = undefined,
  children,
}) => {
  return (
    <ButtonStyle role={role} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyle>
  );
};

export default BottomButton;
