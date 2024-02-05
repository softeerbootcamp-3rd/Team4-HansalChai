import styled from "styled-components";
import theme from "../../styles/theme/Theme.jsx";

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

//CgCloseO
const ErrorSvg = () => (
  <svg
    stroke={typeColor.error}
    fill={typeColor.error}
    stroke-width="0"
    viewBox="0 0 24 24"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
    ></path>
  </svg>
);

//CgDanger
const WarningSvg = () => (
  <svg
    stroke={typeColor.warning}
    fill={typeColor.warning}
    stroke-width="0"
    viewBox="0 0 24 24"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z"></path>
    <path d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
    ></path>
  </svg>
);

//CgMoreO
const InfoSvg = () => (
  <svg
    stroke={typeColor.info}
    fill={typeColor.info}
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z"></path>
    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"></path>
    <path d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
    ></path>
  </svg>
);

//CgCheckO
const SuccessSvg = () => (
  <svg
    stroke={typeColor.success}
    fill={typeColor.success}
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
    ></path>
  </svg>
);

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
