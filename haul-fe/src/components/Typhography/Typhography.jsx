import styled from "styled-components";

const Typo = styled.p`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  ${(props) => props.font && props.theme.font[props.font]};
`;

const Typography = ({ children, ...rest }) => {
  return <Typo {...rest}>{children}</Typo>;
};

export default Typography;
