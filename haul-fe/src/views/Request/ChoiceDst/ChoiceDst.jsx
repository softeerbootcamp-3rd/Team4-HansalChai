import { useState, useRef, useEffect, useContext } from "react";
import { reservationStore } from "../../../store/reservationStore.jsx";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Header from "../../../components/Header/Header.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import SearchMap from "../../../components/Map/SearchMap/SearchMap.jsx";
import Input from "../../../components/Input/Input.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import MotionWrapper from "../../../components/MotionWrapper/MotionWrapper.jsx";
import { UrlMap } from "../../../data/GlobalVariable.js";
import { CheckSubmitDisabledFun, SumbitStore } from "./index.jsx";

const ChoiceDst = () => {
  const navigation = useNavigate();
  const {
    setDstInfo,
    state: {
      srcName,
      srcAddress,
      dstName,
      dstAddress,
      dstCoordinate,
      dstTel,
      dstDetailAddress
    }
  } = useContext(reservationStore);

  const [mapInfo, setMapInfo] = useState({
    name: dstName,
    coordinate: {
      latitude: dstCoordinate.dstLatitude,
      longitude: dstCoordinate.dstLongitude
    },
    detailAddress: dstAddress
  });
  const inDstDetailAddress = useRef(dstDetailAddress);
  const inDstTel = useRef(dstTel);
  const [submitDisabled, CheckSubmitDisabled] = useState(true);

  // 첫 페이지 렌더링 시 이전 값을 입력하지 않고, 잘못된 URL로 넘어왔을때 이전 페이지로 보냄
  useEffect(() => {
    if (!srcAddress) navigation(UrlMap.choiceSrcPageUrl);
  }, []);

  useEffect(() => {
    CheckSubmitDisabled(
      CheckSubmitDisabledFun({
        mapInfo: mapInfo,
        inDstDetailAddress: inDstDetailAddress,
        inDstTel: inDstTel
      })
    );
  }, [mapInfo]);

  return (
    <MotionWrapper>
      <MobileLayout>
        <Header>
          HAUL<TypographySpan color="subColor">.</TypographySpan>
        </Header>
        <Margin height="24px" />
        <Typography font="bold24" singleLine={true}>
          <TypographySpan color="subColor" style={{ marginRight: "2px" }}>
            {srcName ? srcName : srcAddress}
          </TypographySpan>
          에서 출발할게요.
        </Typography>
        <Margin height="6px" />
        <Typography font="bold24">
          <TypographySpan color="subColor">도착지</TypographySpan>는 어딘가요?
        </Typography>
        <Margin height="20px" />
        <SearchMap
          setMapInfo={setMapInfo}
          beforeName={dstName}
          beforeAddress={dstAddress}
          beforeLat={dstCoordinate.dstLatitude}
          beforeLon={dstCoordinate.dstLongitude}
        />
        <Margin height="20px" />
        <Typography font="bold16">상세주소</Typography>
        <Margin height="10px" />
        <Input
          type="text"
          size="small"
          defaultValue={dstDetailAddress}
          placeholder="상세주소를 입력해주세요."
          onChange={({ target: { value } }) => {
            inDstDetailAddress.current = value;
            CheckSubmitDisabled(
              CheckSubmitDisabledFun({
                mapInfo: mapInfo,
                inDstDetailAddress: inDstDetailAddress,
                inDstTel: inDstTel
              })
            );
          }}
        />
        <Margin height="20px" />
        <Typography font="bold16">도착하면 누구에게 연락할까요?</Typography>
        <Margin height="10px" />
        <Input
          size="small"
          placeholder="도착하면 전화할 연락처를 알려주세요."
          defaultValue={dstTel}
          type="tel"
          onChange={({ target: { value } }) => {
            inDstTel.current = value;
            CheckSubmitDisabled(
              CheckSubmitDisabledFun({
                mapInfo: mapInfo,
                inDstDetailAddress: inDstDetailAddress,
                inDstTel: inDstTel
              })
            );
          }}
        />
        <Margin height="30px" />
        <BottomButton
          role="main"
          disabled={submitDisabled}
          onClick={() => {
            SumbitStore({
              inDstTel: inDstTel,
              inDstDetailAddress: inDstDetailAddress,
              mapInfo: mapInfo,
              setDstInfo: setDstInfo,
              navigation: navigation
            });
          }}
        >
          선택완료
        </BottomButton>
        <NavigationBar />
      </MobileLayout>
    </MotionWrapper>
  );
};

export default ChoiceDst;
