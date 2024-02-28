import styled from "styled-components";
import { MaxDeviceWidth, MinDeviceWidth } from "../../data/GlobalVariable.js";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  ${props => props.theme.flex.flexRowCenter};
  background-color: ${props => props.theme.colors.realBlack};
  overflow: auto;
`;

const Mobile = styled.div`
  width: ${MaxDeviceWidth};
  min-width: ${({ minWidth }) => minWidth ?? MinDeviceWidth};
  min-height: 800px;
  height: 100%;
  margin: 0px auto;
  padding: 0px 20px;
  background-color: ${props =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.white};
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
`;

const MobileLayout = ({ children, color, minWidth }) => {
  return (
    <Background>
      <Mobile color={color} minWidth={minWidth}>
        {children}
      </Mobile>
    </Background>
  );
};

export default MobileLayout;
