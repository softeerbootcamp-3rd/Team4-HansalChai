import { ErrorMessageMap, UrlMap } from "../../data/GlobalVariable.js";
import { isPhoneNumber, deleteDash, isValueArr } from "../../utils/helper.js";
import ToastMaker from "../../components/Toast/ToastMaker.jsx";
import { loginFun } from "../../repository/userRepository.jsx";
import {
  setAccessToken,
  setRefreshToken,
  setUserName
} from "../../utils/localStorage.js";

export function checkLoginAbled({
  tel,
  password,
  isButtonDisabled,
  setButtonDisabled
}) {
  const checkIsButtonDisabled = !isValueArr([tel.trim(), password.trim()]);
  if (checkIsButtonDisabled !== isButtonDisabled) {
    setButtonDisabled(checkIsButtonDisabled);
  }
}

//로그인 버튼 클릭 시 실행 함수
export async function loginBtnFun({ tel, password }) {
  tel = deleteDash(tel);
  //전화번호 형식 예외처리
  if (!isPhoneNumber(tel)) {
    ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
    return;
  }
  const { success, data, message } = await loginFun({
    tel: tel,
    password: password
  });
  if (success) {
    setAccessToken(data.data.jwt.accessToken);
    setRefreshToken(data.data.jwt.refreshToken);
    setUserName(data.data.name);
    window.location.href = UrlMap.scheduleCreatePageUrl;
  } else {
    //FIXME: 로그인 실패 예외처리
    ToastMaker({ type: "error", children: message });
  }
}
