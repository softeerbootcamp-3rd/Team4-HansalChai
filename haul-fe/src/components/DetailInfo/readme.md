# DetailInfo

<img width="376" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/100525337/428ffb4c-f483-44ce-9f48-5cb328355e72">

위 그림에 해당하는 컴포넌트 폴더입니다.

## props

1. srcCoordinate
   출발지 경위도 값

2. srcName
   출발지 위치 이름

3. srcAddress
   출발지 주소

4. dstCoordinate
   도착지 경위도 값

5. dstName
   도착지 위치 이름

6. dstAddress
   도착지 주소 이름

7. fee
   비용 (단위 필요 X, 만원 단위)

8. time
   예상도착 시간 (단위 필요 X, 시 기준)

## 활용 예시코드

```jsx
const srcCoordinate = { lat: 37.4239627802915, lng: -122.0829089197085 };
const dstCoordinate = { lat: 37.4212648197085, lng: -122.0856068802915 };

<DetailInfo
  srcCoordinate={srcCoordinate}
  srcAddress="서울특별시 강남구 강남대로 지하396 "
  srcName="강남구 애니타워"
  dstCoordinate={dstCoordinate}
  dstAddress="부산광역시 금정구 부산대학로63번길 2"
  dstName="부산대학교"
  fee="15"
  time="04"
></DetailInfo>;
```
