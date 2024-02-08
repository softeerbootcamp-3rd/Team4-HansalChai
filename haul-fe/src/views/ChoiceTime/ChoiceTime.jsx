import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { reservationStore } from "../../store/reservationStore.jsx";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Header from "../../components/Header/Header.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import Typography_Span from "../../components/Typhography/Typhography_Span.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import { isEmptyString } from "../../utils/helper.js";
import { IoIosArrowDown } from "react-icons/io";

const ChoiceTime = () => {
  const navigation = useNavigate();
  const [ampm, setAmPm] = useState("AM");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const {
    state: { reservationDate },
  } = useContext(reservationStore);
  useEffect(() => {
    if (isEmptyString(reservationDate)) {
      navigation(-1);
    }
  }, []);

  function formatDateString(dateString) {
    if (isEmptyString(dateString)) return "";
    const [year, month, day] = dateString.split(".");
    const formattedMonth = month.length === 1 ? "0" + month : month;
    const formattedDay = day.length === 1 ? "0" + day : day;
    return `${year}.${formattedMonth}.${formattedDay}`;
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

  const hours = Array.from(Array(12), (_, i) => i);
  const minutes = Array.from(Array(6), (_, i) => i * 10);

  return (
    <MobileLayout>
      <Margin height="10px" />
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
          <IconBox style={{ marginLeft: "-6px" }}>
            <IoIosArrowDown size={"24px"} />
          </IconBox>
          <Select id="ampm" value={ampm} onChange={handleAmPmChange}>
            <Option value="AM">오전</Option>
            <Option value="PM">오후</Option>
          </Select>
        </TimeBox>
        <TimeBox>
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

          <Label htmlFor="hour">시</Label>
        </TimeBox>
        <TimeBox>
          <IconBox>
            <IoIosArrowDown size={"24px"} />
          </IconBox>

          <Select id="minute" value={minute} onChange={handleMinuteChange}>
            {minutes.map((minute) => (
              <Option key={minute} value={minute}>
                {minute}
              </Option>
            ))}
          </Select>
          <Label htmlFor="minute">분</Label>
        </TimeBox>
      </TimePicker>
      <FixedCenterBox bottom="20px">
        <BottomButton role="main" disabled={false}>
          선택완료
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};

const TimePicker = styled.div`
  width: 100%;
  height: 128px;
  border-radius: 12px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  ${(props) => props.theme.flex.flexBetweenCenter};
  padding: 40px;
`;

const TimeBox = styled.div`
  width: auto;
  margin: 0 8px;
  ${(props) => props.theme.flex.flexRowAlignCenter};
  position: relative;
  background-size: 20px;
  cursor: pointer;
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0px;
  ${(props) => props.theme.font.semiBold20};
  color: ${(props) => props.theme.colors.black};
`;

const Select = styled.select`
  width: 65px;
  border: none;
  padding: 20 0px;
  border-radius: 4px;
  background-color: transparent;
  ${(props) => props.theme.font.semiBold20};
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  text-align-last: right;
  padding-right: 18px;
  margin-left: 10px;
  z-index: 3;
`;

const Option = styled.option``;

const IconBox = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
`;

export default ChoiceTime;
