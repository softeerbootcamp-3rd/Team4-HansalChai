# UserInfo

<img width="200" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/2649722c-9882-4272-90c8-58847c88a0c7">
<img width="200" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/ebf3825c-ce41-4cde-87ef-3a0eeee98a6c">

## 페이지 설명
사용자 정보를 확인하고 수정할 수 있는 페이지입니다.<br />
비밀번호 변경하기 버튼을 누르면 비밀번호 변경 폼으로 전환되며,<br /> 변경 확인 버튼을 누르면 수정한 비밀번호가 올바를 시 저장됩니다.

헤더의 뒤로가기 버튼과 홈버튼을 이용하여 다른 페이지로 넘어갈 수 있습니다.

## 기능 설명
1. 정보 리스트의 사용자의 정보가 표시됩니다.
2. 비밀번호 변경하기 버튼을 누르면 리스트가 비밀번호 변경 폼으로 전환됩니다.
3. 비밀번호 변경 폼에 변경할 비밀번호를 입력하면 올바른 비밀번호인지 검증합니다.
4. 새 비밀번호가 검증을 통과하고 올바른 비밀번호 확인이 입력된 후<br />변경 확인 버튼을 누르면 서버에 새 비밀번호가 전송되고 정보 리스트로 전환됩니다.
5. 헤더의 뒤로가기 버튼으로 이전 페이지로 돌아갈 수 있으며<br />홈버튼을 이용하여 다른 페이지로 넘어갈 수 있습니다.

## EditForm

### 컴포넌트 설명
프로필 변경폼을 나타내는 컴포넌트입니다.

| 파라미터 | 타입 | 설명 |
|--------|-----|-----|
| navigate | NavigateFunction | UserInfo에서 넘겨주는 useNavigate() 훅의 반환값입니다.<br /> 에러처리 시 페이지 이동에 사용됩니다.|
| setIsEdit | Dispatch<SetStateAction<S>> | UserInfo에서 편집 상태를 갱신할 수 있는 dispatcher입니다.<br />false를 넘겨 편집상태를 끝낼 수 있습니다.|

## ViewForm

### 컴포넌트 설명
프로필 열람폼을 나타내는 컴포넌트입니다.

| 파라미터 | 타입 | 설명 |
|--------|-----|-----|
| userInfo | Object<<br/>name: string,<br/> email: string,<br/> tel: string> | 사용자 정보를 나타내는 Object입니다.<br/>기본값은 모든 key에 대해 "" 입니다. |
| navigate | NavigateFunction | UserInfo에서 넘겨주는 useNavigate() 훅의 반환값입니다.<br /> 에러처리 시 페이지 이동에 사용됩니다.|
| setIsEdit | Dispatch<SetStateAction<S>> | UserInfo에서 편집 상태를 갱신할 수 있는 dispatcher입니다.<br />true를 넘겨 편집상태로 진입할 수 있습니다.|


## index.jsx

### checkPassword
패스워드를 검사하는 함수입니다.
현재는 공백만으로 이루어진 문자열을 제외한 8자 이상의 문자열이면 가능합니다.

 - parameters

| 파라미터 | 타입 | 설명 |
|--------|-----|-----|
| password | string | 설정하려는 비밀번호입니다. |

 - return Object<result: boolean, message: string>
   - result : 설정하려는 비밀번호가 유효한 값인지 나타냅니다.
   - message : 유효하지 않은 이유를 알려주는 메세지입니다. 유효할 경우 빈 문자열입니다.


### checkForm
비밀번호와 비밀번호 확인의 일치를 검사하는 함수입니다.

 - parameters

| 파라미터 | 타입 | 설명 |
|--------|-----|-----|
| password | string | 입력한 비밀번호입니다. |
| passwordConfirm | string | 입력한 비밀번호 확인입니다. |

 - return boolean
   - 일치여부를 나타냅니다.


### async getUserInfo
서버로부터 유저의 프로필을 가져오는 함수입니다.

 - throw Object<success: boolean, code: number, message: string>
   - success: 성공 여부입니다. 예외이므로 항상 false 값이 나옵니다.
   - code: 오류코드입니다. 알 수 없는 오류는 0이며, 알려진 오류는 해당 번호가 나옵니다.
   - message: 오류코드에 해당하는 메세지입니다.

 - return Object<name: string, tel: string, email: string>
   - name: 사용자의 이름입니다.
   - tel: 사용자의 전화번호입니다.
   - email: 사용자의 이메일입니다.