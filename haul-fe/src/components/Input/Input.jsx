import styled from "styled-components";

const InputSection = styled.input`
  width: 100%;
  height: ${(props) => (props.size === "big" ? "60px" : "38px")};
  background-color: ${(props) => props.theme.colors.inputGray};
  ${(props) =>
    props.size === "big"
      ? props.theme.font["regular16"]
      : props.theme.font["regular14"]};
  color: ${(props) => props.theme.colors.black};
  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
`;

const Input = ({ size, placeholder, inputValue }) => {
  return (
    <InputSection
      size={size}
      placeholder={placeholder}
      onChange={({ target: { value } }) => {
        inputValue.current = value;
      }}
    />
  );
};

export default Input;
