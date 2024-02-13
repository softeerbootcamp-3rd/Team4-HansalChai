import styled from "styled-components";

const Typo = styled.span`
  color: ${props =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  ${props => props.font && props.theme.font[props.font]};
`;

const TypographySpan = ({ children, ...rest }) => {
  return <Typo {...rest}>{children}</Typo>;
};

export default TypographySpan;
