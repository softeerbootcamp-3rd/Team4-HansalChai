export function setAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem("refreshToken", refreshToken);
}

export function setUserName(userName) {
  localStorage.setItem("userName", userName);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function getUserName() {
  return localStorage.getItem("userName");
}

export function isLoginFun() {
  const accessToken = getAccessToken();
  return accessToken !== null;
}

export function logoutFun() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
}
