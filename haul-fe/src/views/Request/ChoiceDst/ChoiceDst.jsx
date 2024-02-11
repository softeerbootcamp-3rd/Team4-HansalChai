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
import { useNavigate } from "react-router-dom";
import { UrlMap } from "../../../data/GlobalVariable.js";

const ChoiceDst = () => {
  const navigation = useNavigate();
  const {
    setDstInfo,
    state: { srcName, srcAddress }
  } = useContext(reservationStore);

  const [mapInfo, setMapInfo] = useState({
    name: "",
    coordinate: { latitude: "", longitude: "" },
    detailAddress: ""
  });
  const dstDetailAddress = useRef("");
  const dstTel = useRef("");
  const [submitDisabled, CheckSubmitDisabled] = useState(true);

  // 첫 페이지 렌더링 시 이전 값을 입력하지 않고, 잘못된 URL로 넘어왔을때 이전 페이지로 보냄
  useEffect(() => {
    if (!srcAddress) navigation(UrlMap.choiceSrcPageUrl);
  }, []);

  useEffect(() => {
    CheckSubmitDisabled(CheckSubmitDisabledFun());
  }, [mapInfo]);

  //이 페이지에서 원하는 값이 다 있는지 체크
  function CheckSubmitDisabledFun() {
    const isMapInfoFilled =
      mapInfo.coordinate.latitude !== "" &&
      mapInfo.coordinate.longitude !== "" &&
      mapInfo.detailAddress !== "";
    const isDstDetailAddressFilled = dstDetailAddress.current !== "";
    const isDstTelFilled = dstTel.current !== "";
    return !(isMapInfoFilled && isDstDetailAddressFilled && isDstTelFilled);
  }

  function SumbitStore() {
    setDstInfo({
      dstName: mapInfo.name,
      dstAddress: mapInfo.detailAddress,
      dstLatitude: Number(mapInfo.coordinate.latitude),
      dstLongitude: Number(mapInfo.coordinate.longitude),
      dstDetailAddress: dstDetailAddress.current,
      dstTel: dstTel.current
    });
    navigation(UrlMap.choiceLoadInfoPageUrl);
  }

  return (
    <MobileLayout>
      <Margin height="20px" />
      <Header>
        HAUL<Typography_Span color="subColor">.</Typography_Span>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24" singleLine={true}>
        <Typography_Span color="subColor" style={{ marginRight: "2px" }}>
          {srcName ? srcName : srcAddress}
        </Typography_Span>
        에서 출발할게요.
      </Typography>
      <Margin height="6px" />
      <Typography font="bold24">도착지는 어딘가요?</Typography>
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
          dstDetailAddress.current = value;
          CheckSubmitDisabled(CheckSubmitDisabledFun());
        }}
      />
      <Margin height="20px" />
      <Typography font="bold16">도착하면 누구에게 연락할까요?</Typography>
      <Margin height="10px" />
      <Input
        size="small"
        placeholder="도착하면 전화할 연락처를 알려주세요."
        type="tel"
        onChange={({ target: { value } }) => {
          dstTel.current = value;
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

export default ChoiceDst;
