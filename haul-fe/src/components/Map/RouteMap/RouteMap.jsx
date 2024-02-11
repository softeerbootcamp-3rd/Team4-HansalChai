import { useEffect } from "react";

//const apiKey = import.meta.env.VITE_MAP_KEY;
const restApiKey = import.meta.env.VITE_KAKAO_MAP_REST_KEY;

const loadKakaoMaps = drawdirection => {
  if (window.kakao !== undefined) return;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_MAP_KEY
  }&autoload=false&libraries=services`;

  script.onload = () => {
    window.kakao.maps.load(() => {
      drawdirection();
    });
  };

  document.head.appendChild(script);
};

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

  const requestUrl = `${url}?${queryParams}`; // 파라미터까지 포함된 전체 URL

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
    data.routes[0].sections[0].roads.forEach((router) => {
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

    var bounds = new kakao.maps.LatLngBounds();
    for (let i = 0; i < linePath.length; i++) {
      bounds.extend(linePath[i]);
    }
    kakaoMap.setBounds(bounds);

    var polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#446EDA",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });
    polyline.setMap(kakaoMap);
  } catch (error) {
    console.error("Error:", error);
  }
}

const RouteMap = ({ origin, destination }) => {
  const drawdirection = () => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(origin.lat, origin.lng),
      level: 10,
    };

    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    const originPosition = new kakao.maps.LatLng(origin.lat, origin.lng);
    const destinationPosition = new kakao.maps.LatLng(
      destination.lat,
      destination.lng
    );

    // 출발지, 도착지 마커 생성
    let originMarker = new kakao.maps.Marker({
      position: originPosition,
    });

    let destinationMaker = new kakao.maps.Marker({
      position: destinationPosition,
    });

    originMarker.setMap(kakaoMap);
    destinationMaker.setMap(kakaoMap);

    //경로 생성
    getCarDirection({
      kakaoMap: kakaoMap,
      srcCoordinate: origin,
      dstCoordinate: destination,
    });
  };

  useEffect(() => {
    loadKakaoMaps(drawdirection);
  }, []);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: "227px",
        }}
      ></div>
    </>
  );
};

export default RouteMap;