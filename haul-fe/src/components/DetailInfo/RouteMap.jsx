import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_MAP_KEY;

const containerStyle = {
  width: "100%",
  height: "227px",
  borderRadius: "10px",
};

const RouteMap = ({ origin, destination }) => {
  const [directions, setDirections] = useState(null);

  const calculateRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error("경로 계산 실패:", status);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={calculateRoute}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin}
        zoom={14}
        options={{
          disableDefaultUI: true,
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(RouteMap);
