# CarInfoBox

<img width="375" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/bdf61b24-f27a-49ed-9b14-b0f27805c932">

## Props
carouselList, setSelectedIndex, initialIndex = 0
- carouselList - List\<string\>
  - 캐로셀에서 회전할 이미지의 리스트
  - 가능한 값
    - ["./card.jpg"]
    - 그외 사진의 경로만을 담은 리스트

- setSelectedIndex - setState\<number\>(typescript - React.Dispatch\<React.SetStateAction\<number\>\>)
  - 현재 중앙에 있는 이미지의 인덱스를 담을 setState

- initialIndex - number (Optional)

  - 초기화 시에 중앙에 배치할 이미지의 인덱스
  - 가능한 값
    - 0 (기본 값)
    - 1
    - 2
    - 그외 carouselList의 인덱스를 나타낼 수 있는 정수