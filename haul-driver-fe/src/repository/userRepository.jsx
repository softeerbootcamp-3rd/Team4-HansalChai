import { ErrorMessageMap } from "../data/GlobalVariable.js";
import { getAccessToken } from "../utils/localStorage.js";

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
