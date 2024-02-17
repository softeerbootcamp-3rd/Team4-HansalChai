/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import Input from "../../Input/Input.jsx";
import Margin from "../../Margin/Margin.jsx";
import Typography from "../../Typhography/Typhography.jsx";

function initialAddressFun(beforeName, beforeAddress) {
  if (beforeAddress && beforeName) return `${beforeName},${beforeAddress}`;
  if (beforeAddress) return beforeAddress;
  return "";
}

const SearchMap = ({
  setMapInfo,
  beforeName,
  beforeAddress,
  beforeLat,
  beforeLon
}) => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [address, setAddress] = useState(
    initialAddressFun(beforeName, beforeAddress)
  );

  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);
  const [isPostcodeLoaded, setIsPostcodeLoaded] = useState(false);

  const loadKakaoMaps = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false&libraries=services`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsKakaoMapLoaded(true);
      });
    };

    document.head.appendChild(script);
  };

  const loadPostcode = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
      setIsPostcodeLoaded(true);
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (!isKakaoMapLoaded) {
      loadKakaoMaps();
    }
    if (!isPostcodeLoaded) {
      loadPostcode();
    }
  }, []);

  useEffect(() => {
    if (isKakaoMapLoaded) {
      const container = document.getElementById("map");
      const beforePos = new window.kakao.maps.LatLng(beforeLat, beforeLon);
      const options = {
        center: beforePos,
        level: 3
      };
      const map = new kakao.maps.Map(container, options);
      const marker = new kakao.maps.Marker();
      if (beforeAddress) {
        marker.setMap(null);
        marker.setPosition(beforePos);
        marker.setMap(map);
      }
      setMap(map);
      setMarker(marker);
    }
  }, [isKakaoMapLoaded]);

  const onClickAddr = () => {
    if (!isKakaoMapLoaded || !isPostcodeLoaded) {
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (addrData) {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(addrData.address, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const currentPos = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );
            map.panTo(currentPos);
            marker.setMap(null);
            marker.setPosition(currentPos);
            marker.setMap(map);
            addrData.buildingName.length
              ? setAddress(`${addrData.buildingName}, ${addrData.address}`)
              : setAddress(addrData.address);
            setMapInfo({
              name: addrData.buildingName,
              coordinate: { longitude: result[0].x, latitude: result[0].y },
              detailAddress: addrData.address
            });
          }
        });
      }
    }).open();
  };

  return (
    <>
      <Typography font="semiBold16">지도 검색</Typography>
      <Margin height="10px" />
      <div onClick={onClickAddr}>
        <Input
          id="addr"
          placeholder="주소를 입력해주세요."
          value={address}
          readOnly
        />
      </div>
      <Margin height="12px" />
      <div
        id="map"
        style={{ width: "100%", height: "220px", borderRadius: "10px" }}
      ></div>
    </>
  );
};

export default SearchMap;
