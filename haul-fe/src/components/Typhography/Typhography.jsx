import styled from "styled-components";

const Typo = styled.p`
  color: ${props =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  ${props => props.font && props.theme.font[props.font]};
  ${props =>
    props.singleLine
    && `
    white-space: nowrap; 
    overflow: hidden;    
    text-overflow: ellipsis; 
  `}
`;

const Typography = ({ children, ...rest }) => {
  return <Typo {...rest}>{children}</Typo>;
};

export default Typography;
