import { useNavigate } from "react-router-dom";
import ToastMaker from "../components/Toast/ToastMaker.jsx";
import { ErrorMessageMap, UrlMap } from "../data/GlobalVariable.js";
import { getAccessToken, logoutFun } from "../utils/localStorage.js";

const apiKey = import.meta.env.VITE_API_KEY;

export async function loginFun({ tel, password }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/users/sign-in`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tel, password })
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data
      };
    } else {
      return { success: false, message: "Login failed" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: error.toString() };
  }
}

export async function signUpFun({ name, tel, password, email }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, tel, password, email })
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data
      };
    } else {
      return { success: false, message: "Sign Up failed" };
    }
  } catch (error) {
    console.error("Sign Up error:", error);
    return { success: false, message: error.toString() };
  }
}

export async function getUserProfile() {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`
      }
    });

    if (response.ok) {
      const body = await response.json();
      return {
        success: true,
        data: body.data
      };
    } else {
      return { success: false, message: ErrorMessageMap.NoUserFound };
    }
  } catch (error) {
    console.error("Get Profile error:", error);
    ToastMaker({ type: "error", children: ErrorMessageMap.TryLater });
    return { success: false, message: error.toString() };
  }
}

export async function putPassword({ password }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify({ password })
    });

    if (response.ok) {
      return {
        success: true,
        message: "비밀번호 변경에 성공했어요"
      };
    } else {
      return { success: false, message: ErrorMessageMap.ChangePasswordFailed };
    }
  } catch (error) {
    console.error("Put Password error:", error);
    ToastMaker({ type: "error", children: ErrorMessageMap.TryLater });
    return { success: false, message: error.toString() };
  }
}

//TODO: 변경됨! 카톡에서 찾을 것!!!
export function isTokenInvalid(code) {
  switch (code) {
    case 2003:
      ToastMaker({ type: "error", children: ErrorMessageMap.InvalidAccessError });
      break;
    case 1101:
    case 2001:
    case 2002: //fall-through
      ToastMaker({ type: "error", children: ErrorMessageMap.TokenExpired});
      break;
    default:
      return false;
  }
  logoutFun();
  useNavigate().navigate(UrlMap.loginPageUrl);
  return true;
}