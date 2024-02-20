import { ErrorMessageMap,UrlMap } from "../data/GlobalVariable.js";
import { getAccessToken, logoutFun } from "../utils/localStorage.js";
import { useNavigate } from "react-router-dom";
import ToastMaker from "../components/Toast/ToastMaker.jsx";

const apiKey = import.meta.env.VITE_API_KEY;

export async function loginFun({ tel, password }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/users/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tel, password })
    });
    const data = await response.json();
    if (data.status === 200)
      return {
        success: true,
        data
      };
    return { success: false, code: data.code };
  } catch (error) {
    console.error("Login error:", error);
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
    return {
      success: false,
      children: ErrorMessageMap.TryLater,
      message: error.toString()
    };
  }
}


export function isTokenInvalid(code) {
  switch (code) {
    case 2003:
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.InvalidAccessError
      });
      break;
    case 1001:
    case 2001:
    case 2002:
      ToastMaker({ type: "error", children: ErrorMessageMap.TokenExpired });
      break;
    default:
      return false;
  }
  logoutFun();
  useNavigate().navigate(UrlMap.loginPageUrl);
  return true;
}
