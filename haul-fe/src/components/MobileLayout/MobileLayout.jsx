import styled from "styled-components";
import { MaxDeviceWidth } from "../../data/GlobalVariable";

const Background = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background-color: ${(props) => props.theme.colors.realBlack};
  overflow-x: hidden;
  overflow-y: hidden;
  justify-content: center;
`;

const Mobile = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  width: ${MaxDeviceWidth};
  height: 100vh;
  margin: 0px auto;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.white};
`;

const MobileLayout = ({ children, color }) => {
  return (
    <Background>
      <Mobile color={color}>{children}</Mobile>
    </Background>
  );
};

export default MobileLayout;
