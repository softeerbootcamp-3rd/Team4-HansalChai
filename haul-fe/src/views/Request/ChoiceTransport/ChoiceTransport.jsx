import { useContext } from "react";
import { reservationStore } from "../../../store/reservationStore.jsx";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../../components/Header/Header.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import styled from "styled-components";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import { UrlMap, TransportTypeArr } from "../../../data/GlobalVariable.js";
import TranportSvg from "./components/TrasportSvg.jsx";

const ImgBox = styled.img`
  width: 140px;
`;

const TransportBox = styled.div`
  width: 100%;
  height: 144px;
  margin-bottom: 20px;
  border-radius: 6px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.boxeachcolor};
  ${props => props.theme.flex.flexBetween};
  padding: 0 20px;
  cursor: pointer;
`;

const ChoiceTransport = () => {
  const { setTransportType } = useContext(reservationStore);

  const navigation = useNavigate();
  const ChoiceTransportBoxLogic = transportType => {
    setTransportType(transportType);
    navigation(UrlMap.choiceDatePageUrl);
  };

  return (
    <MobileLayout>
      <Header back={false}>
        HAUL
        <TypographySpan color="subColor">.</TypographySpan>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">운송의 종류를 선택해주세요.</Typography>
      <Margin height="24px" />
      {TransportTypeArr.map(
        (
          { transportType, transportPlusInfo, maxLoad, boxEachColor, img },
          idx
        ) => (
          <TransportBox
            key={idx}
            boxeachcolor={boxEachColor}
            onClick={() => {
              ChoiceTransportBoxLogic(transportType);
            }}
          >
            <Flex
              kind="flexColumnBetween"
              style={{ paddingTop: "32px", paddingBottom: "25px" }}
            >
              <Typography font="bold24">{transportType}</Typography>
              <Flex>
                <Typography font="semiBold16" color="white">
                  {transportPlusInfo}
                </Typography>
                <Margin height="5px" />
                <Typography font="bold16">최대 {maxLoad}톤</Typography>
              </Flex>
            </Flex>
            <TranportSvg id={img}/>
          </TransportBox>
        )
      )}
      <Margin height="90px" />
      <NavigationBar />
    </MobileLayout>
  );
};

export default ChoiceTransport;
