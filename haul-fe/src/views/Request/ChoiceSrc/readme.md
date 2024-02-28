# ChoiceSrc

<img width="200" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/bd5077ae-d511-4a99-8ce7-b6f06807f43e">

## 페이지 설명
출발지를 선택하는 화면입니다.<br/>
운송 시각을 선택하면 접근할 수 있습니다.<br/>
카카오 맵 API를 사용하여 장소 검색과 지도 표시를 지원합니다.

출발지 정보를 입력하거나 네비게이션 바를 이용해 다른 메뉴로 넘어갈 수 있습니다.

## 기능 설명
1. 지도 검색 창을 누르면 다른 창이 나타나 주소를 입력받습니다.<br/>해당 창에서 주소를 입력받으면 지도와 지도 검색 창에 반영됩니다.
2. 상세주소와 도착지 연락처를 입력받고 각각 검증합니다.
3. 검증 후 도착지 입력 페이지로 넘어갈 수 있습니다.
4. 네비게이션 바의 더보기를 누르면 더보기 메뉴 페이지로,<br/>예약 확인을 누르면 예약 확인 페이지로 넘어갈 수 있습니다.

## index.jsx

### showUserTime
선택한 시간 값의 포멧을 hh:mm에서 오전/후 hh시 mm분으로 변경하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|-------|-----|-----|
| reservationTime | string | 선택한 시간 값입니다. |


### checkSubmitDisabledFun
모든 입력폼에 값이 있는지 검사하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|-------|-----|-----|
| mapInfo | State\<Object\> | 현재 선택한 위치에 대한 지도 정보입니다. |
| inSrcDetailAddress | Ref\<string\> | 출발지의 상세 주소를 담은 Ref입니다. |
| inSrcTel | Ref\<string\> | 전화번호 입력값을 담은 Ref 입니다. |

### submitStore
모든 입력 값을 store에 저장하는 함수입니다.
전화번호만을 검증하며, 올바른 전화번호이면 저장한 뒤 다음 페이지로 넘어갑니다.

| 파라미터 | 타입 | 설명 |
|-------|-----|-----|
| mapInfo | State\<Object\> | 현재 선택한 위치에 대한 지도 정보입니다. |
| inSrcDetailAddress | Ref\<string\> | 출발지의 상세 주소를 담은 Ref입니다. |
| inSrcTel | Ref\<string\> | 전화번호 입력값을 담은 Ref 입니다. |
| setSrcInfo | Dispatch | store에 출발지 정보를 저장하는 dispatcher입니다. |
| navigation | NavigateFunction | 페이지를 이동할 때 사용되는 네비게이터입니다. |