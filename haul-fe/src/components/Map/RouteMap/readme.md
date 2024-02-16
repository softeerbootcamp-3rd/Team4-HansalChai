# RouteMap

<img width="470" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/100525337/bdf33e29-ea2a-4c8d-bc70-1ebb2f7a547c">

이 컴포넌트는 출발지, 도착지 정보를 입력하면 최단 경로를 알려주는 지도를 보여주는 컴포넌트입니다.

# props

1. origin

   출발지에 대한 경,위도 좌표 객체입니다.

2. destination

   도착지에 대한 경,위도 좌표 객체입니다.

## 사용예시코드

```jsx

const origin = {
    lat: 37.497259947611596,
    lon: 127.03218978408303
}

const destination = {
		lat: 37.497259947611596,
    lon: 127.03218978408303
}

<RouteMap origin={srcCoordinate} destination={dstCoordinate} />
```
