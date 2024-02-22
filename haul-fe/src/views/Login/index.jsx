import { isPhoneNumber } from "../../utils/helper.js";
import ToastMaker from "../../components/Toast/ToastMaker.jsx";
import {
  setIsMember,
  setAccessToken,
  setRefreshToken
} from "../../utils/localStorage.js";
import { UrlMap, ErrorMessageMap } from "../../data/GlobalVariable.js";
import { loginFun } from "../../repository/userRepository.js";

export function checkLoginAbled({
  tel,
  password,
  isButtonDisabled,
  setButtonDisabled
}) {
  const checkIsButtonDisabled = !(
    tel.current.trim() && password.current.trim()
  );
  if (checkIsButtonDisabled !== isButtonDisabled) {
    setButtonDisabled(checkIsButtonDisabled);
  }
}

//로그인 버튼 클릭 시 실행 함수
export async function loginBtnFun({ tel, password, navigate }) {
  //전화번호 형식 예외처리
  if (!isPhoneNumber(tel.current)) {
    ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
    return;
  }
  const { success, data, code } = await loginFun({
    tel: tel.current,
    password: password.current
  });
  if (success) {
    setIsMember(true);
    setAccessToken(data.data.jwt.accessToken);
    setRefreshToken(data.data.jwt.refreshToken);
    navigate(UrlMap.choiceTranportTypeUrl);
  } else {
    if (code === 2005)
      ToastMaker({ type: "error", children: ErrorMessageMap.NoneId });
    else if (code === 2006)
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.NotSamePassword
      });
    else ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
}
