import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import { isEmptyString } from "../../../utils/helper.js";
import { showUserTime, checkSubmitDisabledFun, submitStore } from "./index.jsx";

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
      //navigation(UrlMap.choiceTimePageUrl);
      return;
    }
    checkSubmitDisabled(
      checkSubmitDisabledFun({
        mapInfo: mapInfo,
        inSrcDetailAddress: inSrcDetailAddress,
        inSrcTel: inSrcTel
      })
    );
  }, []);

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
    checkSubmitDisabled(
      checkSubmitDisabledFun({
        mapInfo: mapInfo,
        inSrcDetailAddress: inSrcDetailAddress,
        inSrcTel: inSrcTel
      })
    );
  }, [mapInfo]);

  return (
    <MobileLayout>
      <Header>
        HAUL<TypographySpan color="subColor">.</TypographySpan>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <TypographySpan color="subColor">
          {showUserTime(reservationTime)}
        </TypographySpan>
        에 뵈러 갈게요.
      </Typography>
      <Margin height="6px" />
      <Typography font="bold24">
        <TypographySpan color="subColor">출발지</TypographySpan>는 어딘가요?
      </Typography>
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
          checkSubmitDisabled(
            checkSubmitDisabledFun({
              mapInfo: mapInfo,
              inSrcDetailAddress: inSrcDetailAddress,
              inSrcTel: inSrcTel
            })
          );
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
          checkSubmitDisabled(
            checkSubmitDisabledFun({
              mapInfo: mapInfo,
              inSrcDetailAddress: inSrcDetailAddress,
              inSrcTel: inSrcTel
            })
          );
        }}
      />
      <Margin height="30px" />
      <BottomButton
        role="main"
        disabled={submitDisabled}
        onClick={() => {
          submitStore({
            inSrcTel: inSrcTel,
            inSrcDetailAddress: inSrcDetailAddress,
            mapInfo: mapInfo,
            setSrcInfo: setSrcInfo,
            navigation: navigation
          });
        }}
      >
        선택완료
      </BottomButton>
      <NavigationBar />
    </MobileLayout>
  );
};

export default ChoiceSrc;
