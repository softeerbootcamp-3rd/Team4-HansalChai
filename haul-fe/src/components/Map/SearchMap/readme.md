# SearchMap

<img width="380" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/100525337/25ba5e31-b622-4543-bf63-9ad63dc20b0c">

이 컴포넌트는 카카오맵을 이용하여 주소 검색을 하여 검색한 장소의 공간정보를 가져올 수 있는 컴포넌트입니다.

# props

1. setMapInfo

   검색 장소에 대한 정보를 넣어줄 set함수입니다. 이곳에 데이터를 전달해줍니다.

2. beforeName

   이전에 선택된 장소 이름입니다. 그 장소로 처음 선택이 되어집니다. 만약 있다면 넣어주세요.

3. beforeAddress

   이전에 선택된 장소 주소입니다. 그 장소로 처음 선택이 되어집니다. 만약 있다면 넣어주세요.

4. beforeLat

   이전에 선택된 장소 **위도**입니다. 그 장소로 처음 선택이 되어집니다. 만약 있다면 넣어주세요.

5. beforeLon

   이전에 선택된 장소 경도**도**입니다. 그 장소로 처음 선택이 되어집니다. 만약 있다면 넣어주세요.

## 사용예시코드

```jsx

const dstCoordinate = {
		dstLatitude: 37.497259947611596,
    dstLongitude: 127.03218978408303
}

<SearchMap
    setMapInfo={setMapInfo}
    beforeName={dstName}
    beforeAddress={dstAddress}
    beforeLat={dstCoordinate.dstLatitude}
    beforeLon={dstCoordinate.dstLongitude}
/>
```
