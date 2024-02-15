# Store

프로젝트에서 사용하는 Store를 정의하는 폴더입니다.

---

# reservationStore

# 🌳 Object(State)

1. `transportType` : 운송 종류
2. `reservationDate` : 예약 날짜
3. `reservationTime` : 예약 시간
4. `srcName` : 출발지 이름
5. `srcCoordinate` : 출발지 좌표
6. `srcDetailAddress` : 출발지 상세주소
7. `srcTel`: 출발지 도착시 연락 전화번호
8. `dstName`: 목적지 이름
9. `dstCoordinate` : 목적지 좌표
10. `dstDetailAddress` : 목적지 상세주소
11. `dstTel` : 도착지 도착시 연락 전화번호
12. `cargoWeight` : 적재할 무게
13. `cargoWidth` : 적재할 최대 너비
14. `cargoLength` : 적재할 최대 길이
15. `cargoHeight`: 적재할 최대 높이
16. `specialNotes` : 적재 시에 특이사항 배열 ( { note: "냉장", selected: false } 의 형태의 객체 배열 )

# 🔥 Action Type

1. `SET_INITIAL_STATE`
   - 정의
     reservation객체를 초기화함.
   - 사용법
     setInitialState를 useContext로 가져오고 원하는 곳에서 실행시키면 된다.
2. `SET_TRANSPORT_TYPE`
   - 정의
     transportType를 정의함
   - 사용방법
     setTransportType를 useContext로 가져오고 안에 transportType을 인자로 주면 된다.
3. `SET_RESERVATION_DATE`
   - 정의
     reservationDate를 정의함
   - 사용방법
     setReservationDate를 useContent로 가져오고 안에 reservationDate를 인자로 주면 된다.
4. `SET_RESERVATION_TIME`
   - 정의
     reservationTime을 정의함
   - 사용방법
     setReservationTime을 useContent로 가져오고 안에 reservationTime를 인자로 주면 된다.
5. `SET_SRC_INFO`
   - 정의
     출발지 관련 정보를 정의합니다. ( srcName, srcAddress, srcLatitude, srcLongitude, srcDetailAddress, srcTel )
   - 사용방법
     setSrcInfo을 useContent로 가져오고 안에 출발지 관련정보 ( srcName, srcAddress, srcLatitude, srcLongitude, srcDetailAddress, srcTel ) 를 인자로 주면 된다.
6. `SET_DST_INFO`
   - 정의
     도착지 관련 정보를 정의합니다. ( dstName, dstAddress, dstLatitude, dstLongitude, dstDetailAddress, dstTel )
   - 사용방법
     setDstInfo을 useContent로 가져오고 안에 도착지 관련정보 ( dstName, dstAddress, dstLatitude, dstLongitude, dstDetailAddress, dstTel ) 를 인자로 주면 된다.
7. `SET_ROAD_INFO`
   - 정의
     적재량 관련 정보를 정의합니다. ( cargoWeight, cargoWidth, cargoLength, cargoHeight, specialNotes )
   - 사용방법
     setRoadInfo을 useContent로 가져오고 안에 적재량 관련정보 ( cargoWeight, cargoWidth, cargoLength, cargoHeight, specialNotes ) 를 인자로 주면 된다.
8. `SET_GUEST_INFO`
   - 정의
     비회원 예약 시에 받는 비회원 정보를 Store에 저장합니다.
   - 사용방법
     setGuestInfo을 useContent로 가져오고 안에 비회원 관련정보 ( guestName, guestTel ) 를 인자로 주면 된다.
