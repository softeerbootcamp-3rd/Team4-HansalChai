import styled from "styled-components";

const Flex = styled.div`
  ${props => props.theme.flex[props.kind]};
`;

export default Flex;
