import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Header from "../../../components/Header/Header.jsx";
import Typography_Span from "../../../components/Typhography/Typhography_Span.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import SearchMap from "../../../components/Map/SearchMap/SearchMap.jsx";
import Input from "../../../components/Input/Input.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import { useState } from "react";


const ChoiceSrc = () => {

  const [mapInfo, setMapInfo] = useState({
    name: "",
    coordinate: { latitude: "", longitude: "" },
    detailAddress: ""
  })

    
  return <MobileLayout> 
    <Margin height="20px" />
    <Header>
      HAUL<Typography_Span color="subColor">.</Typography_Span>
    </Header>
    <Margin height="24px" />
    <Typography font="bold24">
      <Typography_Span color="subColor" style={{ marginRight: "2px" }}>
        PM 6시30분
      </Typography_Span>
      에 뵈러 갈게요.
    </Typography>
    <Margin height="6px" />
    <Typography font="bold24">
      출발지는 어딘가요?
    </Typography>
    <Margin height="20px" />
    <SearchMap setMapInfo={setMapInfo}/>
    <Margin height="20px" />
    <Typography font="bold16">
      상세주소
    </Typography>
    <Margin height="10px" />
    <Input size="small" placeholder="상세주소를 입력해주세요."/>
    <Margin height="20px" />
    <Typography font="bold16">
      도착하면 누구에게 연락할까요?
    </Typography>
    <Margin height="10px" />
    <Input size="small" placeholder="도착하면 전화할 연락처를 알려주세요."/>
    <Margin height="30px" />
    <BottomButton role="main" disabled={false}>선택완료</BottomButton>
  </MobileLayout>;
};

export default ChoiceSrc;
