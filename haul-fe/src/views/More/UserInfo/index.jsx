import { getUserProfile } from "../../../repository/userRepository";
import { setUserName } from "../../../utils/localStorage";

export const checkPassword = password => {
  if (password.length === 0) return null;
  if (password.trim().length === 0)
    return {
      result: false,
      message: "비밀번호는 공백으로만 이루어질 수는 없습니다."
    };
  if (password.length < 8) {
    return {
      result: false,
      message: "비밀번호는 영문, 숫자, 특수문자를 모두 합하여 8자 이상입니다."
    };
  }
  return { result: true, message: "" };
};

export const checkForm = ({ password, passwordConfirm }) => {
  //비밀번호 미 입력 시 변경 안함
  if (password === null && passwordConfirm === null) {
    return false;
  }
  //비밀번호 규칙과 어긋날 시 저장 안함
  if (!(password.result && passwordConfirm)) {
    return false;
  }
  return true;
};

export const getUserInfo = async () => {
  const response = await getUserProfile();
  if (!response.success) throw response;
  setUserName(response.data.name);
  return response.data;
};
