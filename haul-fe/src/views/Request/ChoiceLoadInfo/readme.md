# ChoiceLoadInfo

<img width="200" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/7020c9ed-7083-4dca-b651-acde306f4e20">

## 페이지 설명
운송할 짐에 대한 정보를 입력하는 화면입니다.<br/>
도착지를 선택하면 접근할 수 있습니다.

운송 품목 정보를 입력해 다음 페이지로 넘아가거나 네비게이션 바를 이용해 다른 메뉴로 넘어갈 수 있습니다.

## 기능 설명
1. 운송할 물품의 무게 총합을 입력합니다. <br/>가능한 최대 무게는 운송 종류에 영향을 받습니다.
2. 물품 전체의 크기를 입력합니다. <br/>모두 모았을 때를 기준으로 입력하며, 각각 1000cm 까지 가능합니다.
3. 품목의 특이사항에 대해 입력합니다. <br/>토글버튼으로 한 번에 여러개를 선택할 수도, 아무것도 선택하지 않을 수도 있습니다.
4. 모두 입력한 다음 하단 버튼을 누르면 다음 페이지로 넘어갑니다.
5. 네비게이션 바의 더보기를 누르면 더보기 메뉴 페이지로,<br/>예약 확인을 누르면 예약 확인 페이지로 넘어갈 수 있습니다.

## index.jsx

### CheckSubmitDisabledFun
모든 입력폼에 값이 있는지 검사하는 함수입니다.

| 파라미터 | 타입 | 설명 |
|-------|-----|-----|
| inCargoWeight | Ref\<string\> | 짐의 무게를  담은 Ref입니다. |
| inCargoWidth | Ref\<string\> | 짐의 너비를 담은 Ref 입니다. |
| inCargoLength | Ref\<string\> | 짐의 길이를 담은 Ref입니다. |
| inCargoHeight | Ref\<string\> | 짐의 높이를 담은 Ref 입니다. |
| submitDisabled | State<boolean> | 버튼의 활성화 여부를 나타내는 값입니다. |
| CheckSubmitDisabled | Dispatch\<SetStateAction\<boolean\>\> | 버튼의 활성화 여부를 변경하는 setter입니다. |

### async SumbitStore
모든 입력 값을 store에 저장하는 함수입니다.<br/>
짐의 너비, 길이, 높이, 무게를 검증하며, 허용되는 짐이면 저장한 뒤 <br/>
비회원이라면 비회원 정보 입력 페이지로, 회원이라면 서버와 통신 후 결제 페이지로 넘어갑니다.

| 파라미터 | 타입 | 설명 |
|-------|-----|-----|
| inCargoWeight | Ref\<string\> | 짐의 무게를  담은 Ref입니다. |
| inCargoWidth | Ref\<string\> | 짐의 너비를 담은 Ref 입니다. |
| inCargoLength | Ref\<string\> | 짐의 길이를 담은 Ref입니다. |
| inCargoHeight | Ref\<string\> | 짐의 높이를 담은 Ref 입니다. |
| setRoadInfo | Dispatch | store에 짐 정보를 저장하는 dispatcher입니다. |
| navigation | NavigateFunction | 페이지를 이동할 때 사용되는 네비게이터입니다. |
| setResultLoading | Dispatch\<SetStateAction\<boolean\>\> | 현재 서버로부터의 응답을 기다리는 중인지 설정하는 setter입니다. |
| transportType | string | 선택한 운송 종류입니다. |
| inSpecialNotes | Ref\<Array\<Object\>\> | 선택한 짐의 특이사항입니다. |
| getReservationState | Getter | 현재 예약 상태를 가져오는 getter입니다. | 