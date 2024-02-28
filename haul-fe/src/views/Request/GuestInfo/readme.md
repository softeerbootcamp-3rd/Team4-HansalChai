# GuestInfo

<img width="200" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/db3e4957-2e2f-4d22-b50d-5d92d4bdcc26">

## 페이지 설명
비회원으로 이용 시 필요한 정보를 입력하는 화면입니다.<br/>
로그인을 하지 않은 사용자만 운송 품목 정보 입력 후 접근할 수 있습니다.

이름과 전화번호를 입력합니다.

## 기능 설명
1. 이름을 입력받습니다. 이름은 빈 문자열인지 검사합니다.
2. 전화번호를 입력받습니다. 입력된 값이 전화번호 양식을 따르는지 감사합니다.
3. 이름과 전화번호가 모두 입력되었고, 두 정보 모두 검사를 통과했다면 다음 단계로 진행할 수 있습니다.


## index.jsx

### checkGuestInfoAbled
비회원 정보 폼의 모든 입력창에 입력 값이 있는지 검사하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|-------|-----|-----|
| inGuestName | Ref\<string\> | 비회원 이용자의 이름입니다. |
| inGuestTel | Ref\<string\> | 비회원 이용자의 전화번호입니다. |
| isButtonDisabled | boolean | 현재 버튼의 활성화 여부를 나타내는 값입니다. |
| setButtonDisabled | Dispatch\<SetState\<boolean\>\> | 버튼의 활셩화 여부를 변경하는 dispatcher입니다. |

### async guestInfoBtnFun
정보 입력 완료 버튼을 누를 시 실행되는 핸들러 함수입니다.
서버와 통신을 하여 예약이 가능한지 여부를 받아옵니다.

| 파라미터 | 타입 | 설명 |
|-------|-----|-----|
| inGuestName | Ref\<string\> | 비회원 이용자의 이름입니다. |
| inGuestTel | Ref\<string\> | 비회원 이용자의 전화번호입니다. |
| setGuestInfo | Dispatch | store에 비회원 이용자의 정보를 설정하는 dispatcher입니다. |
| getReservationState | getter | store에서 예약 정보를 불러오는 getter입니다. |
| setResultLoading | Dispatch\<SetState\<boolean\>\> | 현재 데이터 로딩 여부를 나타내는 값입니다. |
| navigate | NavigateFunction | 페이지 이동 시 사용되는 네비게이터입니다. |