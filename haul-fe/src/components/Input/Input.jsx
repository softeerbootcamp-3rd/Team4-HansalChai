import styled from "styled-components";

const InputSection = styled.input`
  width: 100%;
  height: ${(props) => (props.size === "big" ? "56px" : "38px")};
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

//useRef의 value를 받기로 약속됨.
const Input = ({ type, size, placeholder, onChange }) => {
  return (
    <InputSection
      type={type}
      size={size}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
