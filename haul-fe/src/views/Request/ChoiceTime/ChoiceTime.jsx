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
import { IoIosArrowDown } from "react-icons/io";
import { UrlMap } from "../../../data/GlobalVariable.js";
import { MaxDeviceWidth } from "../../../data/GlobalVariable.js";

const ChoiceTime = () => {
  const navigation = useNavigate();
  const [ampm, setAmPm] = useState("AM");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const hours = Array.from(Array(12), (_, i) => i);
  const minutes = Array.from(Array(6), (_, i) => i * 10);

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
      setStateTime(reservationTime);
    }
  }, []);

  function formatDateString(dateString) {
    if (isEmptyString(dateString)) return "";
    const [year, month, day] = dateString.split(".");
    const formattedMonth = month.length === 1 ? "0" + month : month;
    const formattedDay = day.length === 1 ? "0" + day : day;
    return `${year}.${formattedMonth}.${formattedDay}`;
  }

  function formatStoreTime() {
    let pushHour = Number(hour);
    const pushMin = Number(minute);
    if (ampm === "PM") {
      pushHour += 12;
    }
    const resultFormat = pushHour + "-" + pushMin;
    return resultFormat;
  }

  function sumbitFun() {
    setReservationTime(formatStoreTime());
    navigation(UrlMap.choiceSrcPageUrl);
  }

  //백엔드 형식을 위해 15-30이런식으로 저장되어있는걸 state로 변화하는 함수
  function setStateTime(storeTimeString) {
    const [h, m] = storeTimeString.split("-").map((v) => Number(v));
    h < 12 ? setAmPm("AM") : setAmPm("PM");
    setHour(h % 12);
    setMinute(m);
  }

  const handleAmPmChange = (e) => {
    setAmPm(e.target.value);
  };

  const handleHourChange = (e) => {
    setHour(parseInt(e.target.value));
  };

  const handleMinuteChange = (e) => {
    setMinute(parseInt(e.target.value));
  };

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
      <Margin height="150px" />
      <TimePicker>
        <TimeBox>
          <TimeEachBox>
            <IconBox style={{ marginLeft: "-6px" }}>
              <IoIosArrowDown size={"24px"} />
            </IconBox>
            <Select id="ampm" value={ampm} onChange={handleAmPmChange}>
              <Option value="AM">오전</Option>
              <Option value="PM">오후</Option>
            </Select>
          </TimeEachBox>
          <Typography font="bold24">:</Typography>
          <TimeEachBox>
            <IconBox>
              <IoIosArrowDown size={"24px"} />
            </IconBox>
            <Select id="hour" value={hour} onChange={handleHourChange}>
              {hours.map((hour) => (
                <Option key={hour} value={hour}>
                  {hour}
                </Option>
              ))}
            </Select>
          </TimeEachBox>
          <Typography font="bold24">:</Typography>
          <TimeEachBox>
            <IconBox>
              <IoIosArrowDown size={"24px"} />
            </IconBox>

            <Select id="minute" value={minute} onChange={handleMinuteChange}>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </Select>
          </TimeEachBox>
        </TimeBox>
      </TimePicker>
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

const TimePicker = styled.div`
  display: flex;
  align-items: flex-start;
  width: calc(${MaxDeviceWidth});
  height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: fixed;
  top: 24%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0px 40px;
  padding-top: 100px;
`;

const TimeBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeEachBox = styled.div`
  width: auto;
  position: relative;
  cursor: pointer;
`;

const Select = styled.select`
  width: 80px;
  height: 50px;
  border: none;
  padding: 0 16px;
  border-radius: 4px;
  background-color: transparent;
  ${(props) => props.theme.font.bold16};
  color: ${(props) => props.theme.colors.black};
  background-color: #e0e6f8;
  text-align: center;
  text-align-last: right;
  z-index: 3;
`;

const Option = styled.option`
  ${(props) => props.theme.font.semiBold18};
`;

const IconBox = styled.div`
  position: absolute;
  top: 52%;
  transform: translateY(-50%);
  left: 13px;
  z-index: 10;
`;

export default ChoiceTime;
