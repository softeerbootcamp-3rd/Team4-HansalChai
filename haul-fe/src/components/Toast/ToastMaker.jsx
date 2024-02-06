import ReactDOM from "react-dom/client";
import theme from "../../styles/theme/Theme.jsx";
import styled from "styled-components";
import Toast from "./Toast.jsx";

const ToastListFrame = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 50px;
  left: 0;
  z-index: 100;
  ${theme.flex.flexColumnCenter};
`;

let index = 0;
let toastRootDom, toastRoot;
const toastList = [];

const toRender = () => {
  return (
    <>
      <ToastListFrame>
        {toastList.map((toast, index) => {
          return (
            <Toast type={toast.type} key={"toast" + index} id={"toast" + index}>
              {toast.children}
            </Toast>
          );
        })}
      </ToastListFrame>
    </>
  );
};

const ToastMaker = ({ type, children }) => {
  if (!toastRootDom) {
    toastRootDom = document.getElementById("toast__root");
    toastRoot = ReactDOM.createRoot(toastRootDom);
  }
  toastList.push({ type, children, index });
  index++;

  setTimeout(() => {
    toastList.shift();
    toastRoot.render(toRender());
  }, 3000);

  toastRoot.render(toRender());
};

export default ToastMaker;
