import { useEffect } from "react";

const restApiKey = import.meta.env.VITE_KAKAO_MAP_REST_KEY;

// 지도, 출발지, 도착지 위도를 찍으면 지도에 경로를 그려주는 함수
async function getCarDirection({ kakaoMap, srcCoordinate, dstCoordinate }) {
  const REST_API_KEY = restApiKey;
  const url = "https://apis-navi.kakaomobility.com/v1/directions";

  const origin = `${srcCoordinate.lng},${srcCoordinate.lat}`;
  const destination = `${dstCoordinate.lng},${dstCoordinate.lat}`;
  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    "Content-Type": "application/json"
  };
  const queryParams = new URLSearchParams({
    origin: origin,
    destination: destination
  });

  const requestUrl = `${url}?${queryParams}`;

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const linePath = [];
    data.routes[0].sections[0].roads.forEach(router => {
      router.vertexes.forEach((vertex, index) => {
        if (index % 2 === 0) {
          linePath.push(
            new kakao.maps.LatLng(
              router.vertexes[index + 1],
              router.vertexes[index]
            )
          );
        }
      });
    });

    const bounds = new kakao.maps.LatLngBounds();
    for (let i = 0; i < linePath.length; i++) {
      bounds.extend(linePath[i]);
    }
    kakaoMap.setBounds(bounds);
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#446EDA",
      strokeOpacity: 0.7,
      strokeStyle: "solid"
    });
    polyline.setMap(kakaoMap);
  } catch (error) {
    console.error("Error:", error);
  }
}

const drawdirection = (origin, destination) => {
  const mapContainer = document.getElementById("map");
  
  window.kakao.maps.load(() => {
    const mapOptions = {
      center: new kakao.maps.LatLng(origin.lat, origin.lng),
      level: 10
    }
  
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    const originPosition = new kakao.maps.LatLng(origin.lat, origin.lng);
    const destinationPosition = new kakao.maps.LatLng(
      destination.lat,
      destination.lng
    );
  
    // 출발지, 도착지 마커 생성
    const originMarker = new kakao.maps.Marker({
      position: originPosition
    });
  
    const destinationMaker = new kakao.maps.Marker({
      position: destinationPosition
    });
  
    originMarker.setMap(kakaoMap);
    destinationMaker.setMap(kakaoMap);
  
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(originPosition);
    bounds.extend(destinationPosition);
    kakaoMap.setBounds(bounds);
  
    //경로 생성
    getCarDirection({
      kakaoMap: kakaoMap,
      srcCoordinate: origin,
      dstCoordinate: destination
    });
  });
};



const RouteMap = ({ origin, destination }) => {
  useEffect(() => {
    drawdirection(origin, destination);
  }, []);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: "227px",
          borderRadius: "10px"
        }}
      ></div>
    </>
  );
};

export default RouteMap;
