# ChoiceDate

<img width="200" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/85825d34-691a-4b26-99c9-bdbec91f52bc">

## 페이지 설명
운송할 날짜를 선택하는 화면입니다.<br/>
운종의 종류를 선택하면 접근할 수 있습니다.

날짜를 선택하거나 네비게이션 바를 이용해 다른 메뉴로 넘어갈 수 있습니다.

## 기능 설명
1. 좌우 화살표를 눌러 이전 달, 다음 달로 변경할 수 있습니다.
2. 예약이 가능한 날짜는 비교적 진하게 표시되며, 가능한 날짜를 눌러 선택합니다.
3. 선택 후, 하단 버튼을 누르면 시간 선택 화면으로 넘어갑니다.
4. 네비게이션 바의 더보기를 누르면 더보기 메뉴 페이지로,<br/>예약 확인을 누르면 예약 확인 페이지로 넘어갈 수 있습니다.

<br/>

## Calendar.jsx

날짜를 선택하는 ChoiceTransport의 하위 컴포넌트입니다.

|파라미터|타입|설명
|---|---|---|
|selectedDay|Date|현재 선택한 날짜가 담긴 Date 객체입니다.|
|setSelectedDay|setState<Date>|선택한 날짜를 가져갈 수 있는 setState입니다.|
|isPrevMonth|boolean|???|
|isNextMonth|boolean|???|
