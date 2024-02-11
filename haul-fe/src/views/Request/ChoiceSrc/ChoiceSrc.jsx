import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Header from "../../../components/Header/Header.jsx";
import Typography_Span from "../../../components/Typhography/Typhography_Span.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import SearchMap from "../../../components/Map/SearchMap/SearchMap.jsx";
import Input from "../../../components/Input/Input.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import { useState, useRef, useEffect, useContext } from "react";
import { reservationStore } from "../../../store/reservationStore.jsx";
import { isEmptyString } from "../../../utils/helper.js";
import { useNavigate } from "react-router-dom";
import { UrlMap } from "../../../data/GlobalVariable.js";

const ChoiceSrc = () => {
  const navigation = useNavigate();
  const {
    setSrcInfo,
    state: { reservationTime }
  } = useContext(reservationStore);

  //시간 선택하지 않는 경우, 이전 페이지인 시간 선택 페이지로 이동
  useEffect(() => {
    if (isEmptyString(reservationTime)) {
      navigation(UrlMap.choiceTimePageUrl);
    }
  }, []);

  function showUserTime() {
    const [reservationHour, reservationHourMin] = reservationTime
      .split("-")
      .map(v => Number(v));
    let showTime = "";
    reservationHour >= 12 ? (showTime = "AM ") : (showTime = "PM ");
    showTime += `${reservationHour % 12}시`;
    showTime += `${reservationHourMin}분`;
    return showTime;
  }

  const [mapInfo, setMapInfo] = useState({
    name: "",
    coordinate: { latitude: "", longitude: "" },
    detailAddress: ""
  });
  const srcDetailAddress = useRef("");
  const srcTel = useRef("");
  const [submitDisabled, CheckSubmitDisabled] = useState(true);

  useEffect(() => {
    CheckSubmitDisabled(CheckSubmitDisabledFun());
  }, [mapInfo]);

  //이 페이지에서 원하는 값이 다 있는지 체크
  function CheckSubmitDisabledFun() {
    const isMapInfoFilled =
      mapInfo.coordinate.latitude !== "" &&
      mapInfo.coordinate.longitude !== "" &&
      mapInfo.detailAddress !== "";
    const isSrcDetailAddressFilled = srcDetailAddress.current !== "";
    const isSrcTelFilled = srcTel.current !== "";
    return !(isMapInfoFilled && isSrcDetailAddressFilled && isSrcTelFilled);
  }

  function SumbitStore() {
    setSrcInfo({
      srcName: mapInfo.name,
      srcAddress: mapInfo.detailAddress,
      srcLatitude: Number(mapInfo.coordinate.latitude),
      srcLongitude: Number(mapInfo.coordinate.longitude),
      srcDetailAddress: srcDetailAddress.current,
      srcTel: srcTel.current
    });
    navigation(UrlMap.choiceDstPageUrl);
  }

  return (
    <MobileLayout>
      <Header>
        HAUL<Typography_Span color="subColor">.</Typography_Span>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <Typography_Span color="subColor" style={{ marginRight: "2px" }}>
          {showUserTime()}
        </Typography_Span>
        에 뵈러 갈게요.
      </Typography>
      <Margin height="6px" />
      <Typography font="bold24">출발지는 어딘가요?</Typography>
      <Margin height="20px" />
      <SearchMap setMapInfo={setMapInfo} />
      <Margin height="20px" />
      <Typography font="bold16">상세주소</Typography>
      <Margin height="10px" />
      <Input
        type="text"
        size="small"
        placeholder="상세주소를 입력해주세요."
        onChange={({ target: { value } }) => {
          srcDetailAddress.current = value;
          CheckSubmitDisabled(CheckSubmitDisabledFun());
        }}
      />
      <Margin height="20px" />
      <Typography font="bold16">도착하면 누구에게 연락할까요?</Typography>
      <Margin height="10px" />
      <Input
        type="tel"
        size="small"
        placeholder="도착하면 전화할 연락처를 알려주세요."
        onChange={({ target: { value } }) => {
          srcTel.current = value;
          CheckSubmitDisabled(CheckSubmitDisabledFun());
        }}
      />
      <Margin height="30px" />
      <BottomButton
        role="main"
        disabled={submitDisabled}
        onClick={() => {
          SumbitStore();
        }}
      >
        선택완료
      </BottomButton>
      <NavigationBar />
    </MobileLayout>
  );
};

export default ChoiceSrc;
