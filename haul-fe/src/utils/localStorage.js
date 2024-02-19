export function setIsMember(isMember) {
  localStorage.setItem("isMember", isMember);
}

export function setAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem("refreshToken", refreshToken);
}

export function setUserName(userName) {
  localStorage.setItem("userName", userName);
}

export function getIsMember() {
  return localStorage.getItem("isMember");
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
  const isMember = getIsMember();
  const accessToken = getAccessToken();
  return isMember === "false" || accessToken !== null;
}

export function isMemberLogin() {
  const isMember = getIsMember();
  const accessToken = getAccessToken();
  return isMember === "true" && accessToken;
}

export function logoutFun() {
  localStorage.removeItem("isMember");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
}
