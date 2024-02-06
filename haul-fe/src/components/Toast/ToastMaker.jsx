import ReactDOM from "react-dom/client";
// toRender 함수로 jsx를 미리 만들어 render 메소드를 통해 toastRoot로 넣는 방식으로 구현되어
// props를 통한 theme 전파를 사용할 수 없음
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
  gap: 4px;
  transition: all 0.5s;
`;

let index = 0;
let toastRootDom, toastRoot;
const toastList = [];

const toRender = () => {
  return (
    <>
      <ToastListFrame>
        {toastList.map((toast) => {
          return (
            <Toast
              type={toast.type}
              key={"toast" + toast.index}
              id={"toast" + toast.index}
            >
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
