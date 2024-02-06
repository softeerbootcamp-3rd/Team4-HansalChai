import styled from "styled-components";

const ToastRootFrame = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 50px;
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToastRoot = () => <ToastRootFrame id="toast__root"></ToastRootFrame>;

export default ToastRoot;
