import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../components/Header/Header.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import styled from "styled-components";
import Transport1 from "../../assets/svgs/Transport1.svg";
import Transport2 from "../../assets/svgs/Transport2.svg";
import Transport3 from "../../assets/svgs/Transport3.svg";
import Transport4 from "../../assets/svgs/Transport4.svg";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import { useContext } from "react";
import { reservationStore } from "../../\bstore/reservationStore.jsx";
import { useNavigate } from "react-router-dom";

const ImgBox = styled.img`
  width: 140px;
`;

const TransportBox = styled.div`
  width: 100%;
  height: 144px;
  border-radius: 6px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.boxeachcolor};
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const ChoiceTransport = () => {
  const transportTypeArr = [
    {
      transportType: "일반 용달",
      transportPlusInfo: "중고거래, 물품 운송",
      maxLoad: 10,
      boxEachColor: "#d9c7e7",
      img: Transport1,
    },
    {
      transportType: "용달 이사",
      transportPlusInfo: "원룸이사, 1인 가구 이사",
      maxLoad: 1,
      boxEachColor: "#FF9A62",
      img: Transport2,
    },
    {
      transportType: "미니 용달",
      transportPlusInfo: "소규모 운송, 물품 3개 이하",
      maxLoad: 1,
      boxEachColor: "#F6D776",
      img: Transport3,
    },
    {
      transportType: "비지니스 운송",
      transportPlusInfo: "거래처 납부, 기업 운송",
      maxLoad: 10,
      boxEachColor: "#85C7EE",
      img: Transport4,
    },
  ];
  const { setTransportType } = useContext(reservationStore);

  const navigation = useNavigate();
  const ChoiceLogic = (transportType) => {
    setTransportType(transportType);
    navigation("/haulRequest/choiceDate");
  };

  return (
    <MobileLayout>
      <Margin height="10px" />
      <Header back={false}>
        HAUL<span style={{ color: "#596FB7" }}>.</span>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">운송의 종류를 선택해주세요.</Typography>
      <Margin height="24px" />
      {transportTypeArr.map(
        (
          { transportType, transportPlusInfo, maxLoad, boxEachColor, img },
          idx
        ) => (
          <div key={idx}>
            <TransportBox
              boxeachcolor={boxEachColor}
              onClick={() => {
                ChoiceLogic(transportType);
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
              <ImgBox src={img} />
            </TransportBox>
            <Margin height="20px" />
          </div>
        )
      )}
      <Margin height="90px" />
      <NavigationBar />
    </MobileLayout>
  );
};

export default ChoiceTransport;
