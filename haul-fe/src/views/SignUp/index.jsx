import ToastMaker from "../../components/Toast/ToastMaker.jsx";
import { UrlMap, ErrorMessageMap } from "../../data/GlobalVariable.js";
import { signUpFun } from "../../repository/userRepository.js";
import { isPhoneNumber } from "../../utils/helper.js";

export const isAllWriteFun = ({
  name,
  tel,
  email,
  password,
  checkPassword,
  isButtonDisabled,
  setButtonDisabled
}) => {
  const checkIsButtonDisabled = !(
    name.current.trim() &&
    tel.current.trim() &&
    email.current.trim() &&
    password.current.trim() &&
    checkPassword.current.trim()
  );
  if (checkIsButtonDisabled !== isButtonDisabled) {
    setButtonDisabled(checkIsButtonDisabled);
  }
};

export const SignUpBtnFun = async ({
  tel,
  name,
  password,
  email,
  isEmailForm,
  isSamePassword,
  navigate
}) => {
  if (!isPhoneNumber(tel.current)) {
    ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
    return;
  }
  if (!isEmailForm) {
    ToastMaker({
      type: "error",
      children: ErrorMessageMap.InvalidEmailformat
    });
    return;
  }
  if (password.current.length < 8) {
    ToastMaker({
      type: "error",
      children: ErrorMessageMap.IsNotMinPasswordCount
    });
    return;
  }
  if (!isSamePassword) {
    ToastMaker({ type: "error", children: ErrorMessageMap.NotSamePassword });
    return;
  }

  const { success, code } = await signUpFun({
    name: name.current,
    tel: tel.current,
    password: password.current,
    email: email.current
  });

  if (success) {
    ToastMaker({ type: "success", children: "하울에 오신걸 환영합니다." });
    navigate(UrlMap.loginPageUrl);
  } else {
    if (code === 2004) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.ExistingPhoneNumberError
      });
    } else
      ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
};
