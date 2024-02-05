import styled from "styled-components";
import theme from "../../styles/theme/Theme.jsx";
import {
  CgCloseO as ErrorSvg,
  CgDanger as WarningSvg,
  CgMoreO as InfoSvg,
  CgCheckO as SuccessSvg,
} from "react-icons/cg";

const typeColor = {
  success: theme.colors.successGreen,
  error: theme.colors.alertRed,
  warning: theme.colors.accentColor,
  info: theme.colors.lightGray,
};

const typeBackground = {
  success: (13, 146, 117, 0.1),
  error: (216, 59, 59, 0.1),
  warning: (243, 237, 200, 0.1),
  info: (224, 222, 222, 0.1),
};

const typeSvg = {
  success: <SuccessSvg />,
  error: <ErrorSvg />,
  warning: <WarningSvg />,
  info: <InfoSvg />,
};

const ToastFrame = styled.div`
  position: absolute;
  width: calc(100% - 40px);
  top: calc(${(props) => (props.top ? props.top : "100% - 15%")});
  left: 20px;
  top: ${(props) => props.top};

  background-color: rgba(${(props) => typeBackground[props.type]});
  border-radius: 10px;
  padding: 4px;
  font-family: "bold";
  font-size: 12px;
  text-align: center;
  color: ${theme.colors.realBlack};
  border: 3px solid ${(props) => typeColor[props.type]};

  ${theme.flex.flexCenter};
`;

const ToastIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;
  top: 0px;
`;

const ToastText = styled.div`
  flex-grow: 1;
`;

const Toast = ({ top, type, children = "" }) => {
  return (
    <ToastFrame top={top} type={type}>
      {typeSvg[type]}
      <ToastText>{children}</ToastText>
    </ToastFrame>
  );
};

/*
    type: "success" | "error" | "warning" | "info"
*/

const ToastMaker = ({ top, type, children }) => {
  let index = 0;
  let toast = (
    <Toast id={"toast" + index} top={top} type={type}>
      {children}
    </Toast>
  );
  setTimeout(() => {
    window["toast" + index].remove();
  }, 3000);
};

export default Toast;
