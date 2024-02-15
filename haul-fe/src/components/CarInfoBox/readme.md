# CarInfoBox

<img width="484" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/100525337/ec0c3aa4-d28e-4cc1-9495-417ed1492794">

## Props

- phase - string

  - 선택된 항목을 전달하는 props
  - 가능한 값
    - “before” - 운송 전 (배정 전, 배정 완료)
    - “moving” - 운송 중
    - “after” - 운송 완료

- type - string

  - 차량의 모델명을 전달하는 props
  - 가능한 값
    - “현대 마이티”
    - 기타 등등

- capacity - string

  - 차량의 종 적재량을 전달하는 props
  - 가능한 값
    - “1톤”
    - 기타 등등

- volumn - string

  - 차량의 너비, 길이, 높이를 전달하는 props
  - 가능한 값
    - “10 X 15 X 3 M”
    - 기타 등등

- quantity - number
  - 차량 대수를 전달하는 props
  - 가능한 값
    - number (기본값 = 1)
