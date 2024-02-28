# Utils

프로젝트에 사용된 Utility 함수들을 설명합니다.

## helper.js

종속성이 없는 순수한 헬퍼 함수를 모은 js 파일입니다.

---

### isEmptyString(value) : boolean
  빈 문자열인지 검사하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| value | string | 검사할 문자열입니다. |

  - 반환값
    - true : value는 비어있는 문자열입니다.
    - false: value는 비어있지 않은 문자열입니다.

  - 참고
    - length 메소드를 통해 검사하므로 해당 메소드가 있는 Array 또한 빈 Array인지 검사할 수 있습니다.

---

### isNumber(value) : boolean
  숫자인지 검사하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| value | any | 검사할 변수입니다. |

  - 반환값
    - true : value는 숫자입니다.
    - false: value는 숫자가 아닙니다.
  
  - 참고
    - isNaN 함수를 통해 검사하므로 이 함수를 통해 value가 Number 타입인지 검증할 수는 없습니다.

---

### isPositiveNumber(value) : boolean

| 파라미터 | 타입 | 설명 |
|------|------|------|
| value | any | 검사할 변수입니다. |

  - 반환값
    - true : value는 양수입니다.
    - false: value는 양수가 아닙니다.(음수, 0, NaN 중 하나)

---

### checkEmail(email) : boolean

  문자열이 이메일 형식을 가지는지 검사하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| email | string | 이메일인지 검사할 문자열입니다. |

  - 반환값
    - true : value는 이메일입니다.
    - false: value는 이메일이 아닙니다.

---

### isPhoneNumber(input) : boolean

  문자열이 전화번호 형식을 가지는지 검사하는 함수입니다.
  010-0000-0000 과 01055553333 두 타입 모두 가능합니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| input | string | 전화번호인지 검사할 문자열입니다. |

  - 반환값
    - true : value는 전화번호입니다.
    - false: value는 전화번호가 아닙니다.

---

### stringToDateObject(str) : Date

  문자열을 넣으면 Date객체로 만들어주는 함수입니다.
  YYYY-MM-DD 형식만 가능합니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| str | string | 전화번호인지 검사할 문자열입니다. |

  - 반환값
    - Date : str에 해당하는 날짜를 가진 Date 객체입니다. 유효하지 않은 날짜라면 Invaild Date 값을 가집니다.

---

### functionBinder(function, Object) : function() : any

  함수에 일부 인자를 고정시켜줍니다.
  함수는 모든 인자를 하나의 Object를 통해 받아야 합니다.

- 반환값
  - function(Object) : any

---

### makeNavigator(NavigateFunction, string) : function() : void

  useNavigate를 통해 string으로 들어온 링크로 이동하는 함수를 만들어 반환합니다.

- 반환값
  - function() : void

---

### getDeviceInfo() : Object

  현재 디바이스 정보와 브라우저 정보를 반환합니다.

- 반환값
  - Object<
      device: string,
      browser: string,
      version: string
      >

## localStorage.js

local storage 조작과 관련한 함수입니다.
이 프로젝트에서는 로그인 정보를 다루고 있습니다.

---

### setIsMember(isMember)

  회원 여부를 나타내는 isMember 값을 localStorage에 저장하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| isMember | boolean | 저장할 isMember 값입니다. |

---

### setAccessToken(accessToken)

  accessToken을 localStorage에 저장하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| accessToken | string | 저장할 accessToken 값입니다. |

---

### setRefreshToken(refreshToken)

  refreshToken을 localStorage에 저장하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| refreshToken | string | 저장할 refreshToken 값입니다. |

---

### setUserName
  사용자의 이름을 localStorage에 저장합니다.

| 파라미터 | 타입 | 설명 |
|------|------|------|
| userName | string | 저장할 사용자의 이름입니다. |

---

### setNotInstall
  PWA의 설치 안내 여부를 true로 하여 localStorage에 저장합니다.

---

### getIsMember() : string

  localStorage에서 회원 여부를 나타내는 isMember 값을 가져오는 함수입니다.

- 반환값
  - string : localStorage에 저장된 회원 여부를 나타내는 isMember 값입니다.

---

### getAccessToken() : string

  localStorage에서 accessToken을 가져오는 함수입니다.

- 반환값
  - string : localStorage에 저장된 accessToken입니다.

---

### getRefreshToken() : string

  localStorage에서 refreshToken을 가져오는 함수입니다.

- 반환값
  - string : localStorage에 저장된 refreshToken입니다.
  
---

### getUserName
  localStorage에서 사용자의 이름을 가져오는 함수입니다.

- 반환값
  - string : localStorage에 저장된 사용자의 이름입니다.

---

### setNotInstall
  localStorage에서 PWA의 설치 안내 여부를 가져오는 함수입니다.

- 반환값
  - string : localStorage에 저장된 PWA의 설치 안내 여부입니다.

---

### isLoginFun() : boolean

  로그인 여부를 확인하는 함수입니다.

- 반환값
  - true : 정상적으로 로그인을 한 사용자입니다.
  - false: 로그인 처리가 안 된 사용자입니다.

---

### isMemberLogin() : boolean

  회원 로그인 여부를 확인하는 함수입니다.

- 반환값
  - true : 회원 로그인을 한 사용자입니다.
  - false: 비회원 로그인을 한 사용자입니다.

---

### logoutFun() : void

  localStorage에서 모든 로그인 정보를 삭제하는 함수입니다.

---

### logoutFun() : void

  localStorage에서 비회원 로그인 정보를 삭제하는 함수입니다.