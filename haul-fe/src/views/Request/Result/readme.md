# Result

<img width="293" height="" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/24e91d6b-a634-49e0-84ff-e5e16abec7c6">

## 페이지 설명
입력된 값을 토대로 나온 견적을 확인하는 화면입니다.<br/>
모든 예약과 관련된 정보를 입력한 뒤 접근할 수 있습니다.

결정 버튼을 눌러 결제 페이지로 넘어가거나 유선 상담을 받을 수 있습니다.<br/>
또한 헤더의 홈 버튼을 눌러 홈페이지로도 넘어갈 수 있습니다.

## 기능 설명
1. 결정 버튼을 누르면 회원은 결제 페이지로, 비회원은 완료 페이지로 넘어갑니다.
2. 유선 상담 버튼을 누르면 전화 연결로 넘어갑니다.
3. 헤더의 뒤로가기 버튼을 눌러 이전 페이지로 돌아가거나 홈 버튼을 눌러 홈 페이지로 넘어갈 수 있습니다.


## index.jsx

### callCompany
회사의 전화번호로 전화를 거는 함수입니다.


### async decideBtnFun
결제를 결정하는 버튼을 눌렀을 때 실행되는 핸들러 함수입니다.
서버로 데이터를 보내 정상적으로 처리되었으면 store에 기록된 값을 지운 뒤 결제 페이지로 넘어가고<br/>오류가 발생했으면 토스트 메세지를 띄웁니다.

| 파라미터 | 타입 | 설명 |
|-------|-----|-----|
| data | Object | 서버로 보내질 Object 형태의 store 데이터입니다. | 
| navigation | NavigateFunction | 페이지 이동 시에 사용되는 네비게이터입니다. |
| setInitialState | Dispatch | store를 초기화하는 dispatcher입니다. |