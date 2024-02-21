import { useState, useRef, useEffect, useContext } from "react";
import { reservationStore } from "../../../store/reservationStore.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Header from "../../../components/Header/Header.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import SearchMap from "../../../components/Map/SearchMap/SearchMap.jsx";
import Input from "../../../components/Input/Input.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import { isEmptyString, isPhoneNumber } from "../../../utils/helper.js";
import { useNavigate } from "react-router-dom";
import { UrlMap, ErrorMessageMap } from "../../../data/GlobalVariable.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";

const ChoiceSrc = () => {
  const navigation = useNavigate();
  const {
    setSrcInfo,
    state: {
      srcName,
      srcAddress,
      srcCoordinate,
      srcDetailAddress,
      srcTel,
      reservationTime
    }
  } = useContext(reservationStore);

  useEffect(() => {
    //시간 선택하지 않는 경우, 이전 페이지인 시간 선택 페이지로 이동
    if (isEmptyString(reservationTime)) {
      navigation(UrlMap.choiceTimePageUrl);
      return;
    }
    checkSubmitDisabled(checkSubmitDisabledFun());
  }, []);

  function showUserTime() {
    const [reservationHour, reservationHourMin] = reservationTime
      .split(":")
      .map(v => Number(v));
    let showTime = "";
    reservationHour >= 12 ? (showTime = "오후 ") : (showTime = "오전 ");
    reservationHour === 12
      ? (showTime += `${reservationHour}시`)
      : (showTime += `${reservationHour % 12}시`);

    if (reservationHourMin !== 0) {
      showTime += `${reservationHourMin}분`;
    }
    return showTime;
  }

  const [mapInfo, setMapInfo] = useState({
    name: srcName,
    coordinate: {
      latitude: srcCoordinate.srcLatitude,
      longitude: srcCoordinate.srcLongitude
    },
    detailAddress: srcAddress
  });
  const inSrcDetailAddress = useRef(srcDetailAddress);
  const inSrcTel = useRef(srcTel);
  const [submitDisabled, checkSubmitDisabled] = useState(true);

  useEffect(() => {
    checkSubmitDisabled(checkSubmitDisabledFun());
  }, [mapInfo]);

  //이 페이지에서 원하는 값이 다 있는지 체크
  function checkSubmitDisabledFun() {
    const isMapInfoFilled =
      mapInfo.coordinate.latitude !== "" &&
      mapInfo.coordinate.longitude !== "" &&
      mapInfo.detailAddress !== "";
    const isSrcDetailAddressFilled = inSrcDetailAddress.current.trim() !== "";
    const isSrcTelFilled = inSrcTel.current.trim() !== "";
    return !(isMapInfoFilled && isSrcDetailAddressFilled && isSrcTelFilled);
  }

  function sumbitStore() {
    if (!isPhoneNumber(inSrcTel.current)) {
      ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
      return;
    }
    setSrcInfo({
      srcName: mapInfo.name,
      srcAddress: mapInfo.detailAddress,
      srcLatitude: Number(mapInfo.coordinate.latitude),
      srcLongitude: Number(mapInfo.coordinate.longitude),
      srcDetailAddress: inSrcDetailAddress.current,
      srcTel: inSrcTel.current
    });
    navigation(UrlMap.choiceDstPageUrl);
  }

  return (
    <MobileLayout>
      <Header>
        HAUL<TypographySpan color="subColor">.</TypographySpan>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <TypographySpan color="subColor">{showUserTime()}</TypographySpan>에
        뵈러 갈게요.
      </Typography>
      <Margin height="6px" />
      <Typography font="bold24">출발지는 어딘가요?</Typography>
      <Margin height="20px" />
      <SearchMap
        setMapInfo={setMapInfo}
        beforeName={srcName}
        beforeAddress={srcAddress}
        beforeLat={srcCoordinate.srcLatitude}
        beforeLon={srcCoordinate.srcLongitude}
      />
      <Margin height="20px" />
      <Typography font="bold16">상세주소</Typography>
      <Margin height="10px" />
      <Input
        type="text"
        size="small"
        placeholder="상세주소를 입력해주세요."
        defaultValue={srcDetailAddress}
        onChange={({ target: { value } }) => {
          inSrcDetailAddress.current = value;
          checkSubmitDisabled(checkSubmitDisabledFun());
        }}
      />
      <Margin height="20px" />
      <Typography font="bold16">도착하면 누구에게 연락할까요?</Typography>
      <Margin height="10px" />
      <Input
        type="tel"
        size="small"
        placeholder="도착하면 전화할 연락처를 알려주세요."
        defaultValue={srcTel}
        onChange={({ target: { value } }) => {
          inSrcTel.current = value;
          checkSubmitDisabled(checkSubmitDisabledFun());
        }}
      />
      <Margin height="30px" />
      <BottomButton
        role="main"
        disabled={submitDisabled}
        onClick={() => {
          sumbitStore();
        }}
      >
        선택완료
      </BottomButton>
      <NavigationBar />
    </MobileLayout>
  );
};

export default ChoiceSrc;
