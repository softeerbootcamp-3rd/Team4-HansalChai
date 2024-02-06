import styled from "styled-components";
// ToastMaker에서 props를 통한 theme 전파를 사용할 수 없어
// Toast에서도 props로 theme을 받을 수 없음
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
  success: theme.colors.successBackground,
  error: theme.colors.errorBackground,
  warning: theme.colors.warningBackground,
  info: theme.colors.infoBackground,
};

const typeSvg = {
  success: <SuccessSvg color={typeColor.success} />,
  error: <ErrorSvg color={typeColor.error} />,
  warning: <WarningSvg color={typeColor.warning} />,
  info: <InfoSvg color={typeColor.info} />,
};

const ToastFrame = styled.div`
  width: calc(100% - 40px);
  top: ${(props) => props.top};

  background-color: ${({ type }) => typeBackground[type]};
  border-radius: 10px;
  padding: 4px;
  font-family: "bold";
  font-size: 12px;
  text-align: center;
  color: ${theme.colors.realBlack};
  border: 3px solid ${({ type }) => typeColor[type]};

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

const Toast = ({ type, children }) => {
  return (
    <ToastFrame type={type}>
      {typeSvg[type]}
      <ToastText>{children}</ToastText>
    </ToastFrame>
  );
};

export default Toast;
