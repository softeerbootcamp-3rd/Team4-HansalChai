export function setIsMember(isMember) {
  localStorage.setItem("isMember", isMember);
}

export function setAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem("refreshToken", refreshToken);
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
