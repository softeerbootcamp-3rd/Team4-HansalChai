import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { reservationStore } from "../../../store/reservationStore.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Header from "../../../components/Header/Header.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Typography_Span from "../../../components/Typhography/Typhography_Span.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import { isEmptyString } from "../../../utils/helper.js";
import { UrlMap } from "../../../data/GlobalVariable.js";
import { LuClock9 } from "react-icons/lu";
import Flex from "../../../components/Flex/Flex.jsx";

const TimeWrapper = styled.div`
  ${(props) => props.theme.flex.flexRow}
  flex-wrap: wrap;
  gap: 10px;
`;

const SmallBtn = styled.button`
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  background: ${(props) =>
    props.isClick ? props.theme.colors.subColor : props.theme.colors.inputGray};
  ${(props) => props.theme.font.bold12};
  color: ${(props) =>
    props.isClick ? props.theme.colors.white : props.theme.colors.grayText};
  width: 80px;
  height: auto;
  padding: 16px 0px;
  text-align: center;
`;

const ChoiceTime = () => {
  const navigation = useNavigate();
  const [selectedTime, setSelectedTime] = useState("");

  const morningTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
  const afternoonTimes = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const {
    setReservationTime,
    state: { reservationDate, reservationTime },
  } = useContext(reservationStore);

  useEffect(() => {
    //날짜를 선택하지 않고 이 페이지로 오게 될 경우를 대비
    if (isEmptyString(reservationDate)) {
      navigation(UrlMap.choiceDatePageUrl);
    }
    if (!isEmptyString(reservationTime)) {
      setSelectedTime(reservationTime);
    }
  }, []);

  function formatDateString(dateString) {
    if (isEmptyString(dateString)) return "";
    const [year, month, day] = dateString.split(".");
    const formattedMonth = month.length === 1 ? "0" + month : month;
    const formattedDay = day.length === 1 ? "0" + day : day;
    return `${year}.${formattedMonth}.${formattedDay}`;
  }

  function sumbitFun() {
    setReservationTime(selectedTime);
    navigation(UrlMap.choiceSrcPageUrl);
  }

  return (
    <MobileLayout>
      <Margin height="20px" />
      <Header>
        HAUL<Typography_Span color="subColor">.</Typography_Span>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <Typography_Span color="subColor" style={{ marginRight: "2px" }}>
          {formatDateString(reservationDate)}
        </Typography_Span>
        에 뵈러 갈게요.
      </Typography>
      <Margin height="4px" />
      <Typography font="bold24">몇시에 찾아뵈면 될까요?</Typography>
      <Margin height="40px" />
      <Flex kind="flexRowAlignCenter">
        <LuClock9 size={"20px"} style={{ marginRight: "3px" }} />
        <Typography font="bold20">오전</Typography>
      </Flex>
      <Margin height="14px" />
      <TimeWrapper>
        {morningTimes.map((time) => (
          <SmallBtn
            key={time}
            isClick={selectedTime === time}
            onClick={() => {
              setSelectedTime(time);
            }}
          >
            {time}
          </SmallBtn>
        ))}
      </TimeWrapper>
      <Margin height="40px" />
      <Flex kind="flexRowAlignCenter">
        <LuClock9 size={"20px"} style={{ marginRight: "3px" }} />
        <Typography font="bold20">오후</Typography>
      </Flex>
      <Margin height="14px" />
      <TimeWrapper>
        {afternoonTimes.map((time) => (
          <SmallBtn
            key={time}
            isClick={selectedTime === time}
            onClick={() => {
              setSelectedTime(time);
            }}
          >
            {time}
          </SmallBtn>
        ))}
      </TimeWrapper>

      <FixedCenterBox bottom="20px">
        <BottomButton
          role="main"
          disabled={false}
          onClick={() => {
            sumbitFun();
          }}
        >
          선택 완료
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};

export default ChoiceTime;
