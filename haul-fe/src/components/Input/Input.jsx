import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => (props.size === "big" ? "56px" : "38px")};
  background-color: ${(props) => props.theme.colors.inputGray};
  border-radius: 8px;
  border: 1px solid #e1e1e1;
`;

const InputSection = styled.input`
  flex-grow: 1;
  ${(props) =>
    props.size === "big"
      ? props.theme.font["regular16"]
      : props.theme.font["regular14"]};
  color: ${(props) => props.theme.colors.black};
  padding-left: 20px;
  padding-right: ${(props) => (props.textAlign === "right" ? "5px" : "20px")};
  background-color: transparent;
  border: none;
  text-align: ${(props) => (props.textAlign === "right" ? "right" : "left")};
`;

const Unit = styled.span`
  padding-right: 20px;
  color: ${(props) => props.theme.colors.black};
  ${(props) =>
    props.size === "big"
      ? props.theme.font["regular16"]
      : props.theme.font["regular14"]};
`;

const Input = ({
  type,
  size,
  placeholder,
  onChange,
  value,
  readOnly,
  unit,
  textAlign,
}) => {
  return (
    <InputWrapper size={size}>
      <InputSection
        value={value}
        type={type}
        size={size}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        textAlign={textAlign}
      />
      {unit && <Unit size={size}>{unit}</Unit>}
    </InputWrapper>
  );
};

export default Input;
