export const isEmptyString = value => {
  return value.length === 0;
};

export const checkEmail = email => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return emailRegex.test(email);
};

// 2022-02-08이라는 문자열을 넣으면 Date객체로 만들어주는 함수
export function stringToDateObject(str) {
  const parts = str.split(".");
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date;
}
