import styled from "styled-components";
import theme from "../../styles/theme/Theme";

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
  width: 360px;
  height: 100vh;
  margin: 0 auto;
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
