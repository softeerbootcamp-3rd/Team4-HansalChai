import { useState } from "react";
import styled from "styled-components";
import Margin from "../../../../components/Margin/Margin";
import TypographySpan from "../../../../components/Typhography/TyphographySpan";
import Checkmark from "../../../../components/CheckMark/CheckMark";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MaxDeviceWidth } from "../../../../data/GlobalVariable";

const CalendarContainer = styled.div`
  width: calc(${MaxDeviceWidth} + 40px);
  height: calc(100vh - 250px);
  background-color: ${props => props.theme.colors.white};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateX(-20px);
`;

const CalendarNav = styled.div`
  ${props => props.theme.flex.flexBetweenCenter};
  padding: 0 14px;
  margin-bottom: 20px;
  ${props => props.theme.font.bold16};
`;

const CalendarButton = styled.button`
  border: none;
  color: ${props => props.theme.colors.mainColor};
  font-size: 20px;
  cursor: pointer;
  padding-top: 1px;
`;

const CalendarTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  ${props => props.theme.font.semiBold14};
`;

const DayCell = styled.th`
  width: 30px;
  ${props => props.theme.flex.flexCenter};
`;

const CalendarCell = styled.td`
  cursor: pointer;
  width: 30px;
  height: 56px;
  ${props => props.theme.flex.flexCenter};
  ${props => props.theme.font.semiBold14};
  &.prevMonthDay,
  &.nextMonthDay {
    color: #bbb;
  }
  &.prevDay {
    color: #ddd;
  }
  &.futureDay {
    color: #333;
  }
`;

const CalendarTr = styled.tr`
  width: 100%;
  ${props => props.theme.flex.flexBetween};
`;

const GrayLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
`;

const Calendar = ({
  selectedDay,
  setSelectedDay,
  isPrevMonth,
  isNextMonth
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 두 날짜가 같은지 확인하는 함수
  const isSameDay = (toDay, compareDay) => {
    if (
      toDay.getFullYear() === compareDay?.getFullYear() &&
      toDay.getMonth() === compareDay?.getMonth() &&
      toDay.getDate() === compareDay?.getDate()
    ) {
      return true;
    }
    return false;
  };

  //날짜를 클릭했을때 발생하는 함수
  const onClickDay = day => {
    if (isSameDay(day, selectedDay)) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
  };

  //이전 달로 넘어갈때 사용할 함수
  const prevCalendar = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        currentMonth.getDate()
      )
    );
  };

  //다음 달로 넘어갈때 사용할 함수
  const nextCalendar = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        currentMonth.getDate()
      )
    );
  };

  //
  const buildCalendarDays = () => {
    // 이번달 처음 일수를 구함
    const curMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    // 이번달 마지막 일수를 구함
    const curMonthEndDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    //이전 달의 마지막 날
    const prevMonthEndDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    );
    //다음 달의 시작 날
    const nextMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );

    // 이전달의 값을 넣어둠
    const days = Array.from({ length: curMonthStartDate }, (_, i) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthEndDate.getDate() - i
      );
    }).reverse();

    days.push(
      ...Array.from(
        { length: curMonthEndDate.getDate() },
        (_, i) =>
          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
      )
    );

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      days.push(
        ...Array.from(
          { length: remainingDays },
          (_, i) =>
            new Date(
              nextMonthStartDate.getFullYear(),
              nextMonthStartDate.getMonth(),
              i + 1
            )
        )
      );
    }
    return days;
  };

  const buildCalendarTag = calendarDays => {
    return calendarDays.map((day, i) => {
      if (day.getMonth() < currentMonth.getMonth()) {
        return (
          <CalendarCell key={i} className="prevMonthDay">
            {isPrevMonth && day.getDate()}
          </CalendarCell>
        );
      }
      if (day.getMonth() > currentMonth.getMonth()) {
        return (
          <CalendarCell key={i} className="nextMonthDay">
            {isNextMonth && day.getDate()}
          </CalendarCell>
        );
      }
      if (day < today) {
        return (
          <CalendarCell key={i} className="prevDay">
            {day.getDate()}
          </CalendarCell>
        );
      }
      return (
        <CalendarCell
          key={i}
          className={`futureDay ${isSameDay(day, selectedDay) && "choiceDay"}`}
          onClick={() => onClickDay(day)}
          check={isSameDay(day, selectedDay)}
        >
          {isSameDay(day, selectedDay) ? (
            <Checkmark size="medium" />
          ) : (
            day.getDate()
          )}
        </CalendarCell>
      );
    });
  };

  const divideWeek = calendarTags => {
    return calendarTags.reduce((acc, day, i) => {
      if (i % 7 === 0) acc.push([day]);
      else acc[acc.length - 1].push(day);
      return acc;
    }, []);
  };

  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  const calendarRows = divideWeek(calendarTags);

  return (
    <CalendarContainer>
      <CalendarNav>
        <CalendarButton onClick={prevCalendar}>
          <IoIosArrowBack />
        </CalendarButton>
        <TypographySpan font="bold16" color="mainColor">
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </TypographySpan>
        <CalendarButton onClick={nextCalendar}>
          <IoIosArrowForward />
        </CalendarButton>
      </CalendarNav>
      <Margin height="6px" />
      <CalendarTable>
        <thead>
          <CalendarTr>
            {daysOfWeek.map((day, i) => (
              <DayCell key={i}>{day}</DayCell>
            ))}
          </CalendarTr>
        </thead>
        <tr style={{ height: "8px" }} />
        <tbody>
          <tr style={{ height: "16px" }} />
          {calendarRows.map((row, i) => [
            <GrayLine key={i} />,
            <CalendarTr key={`row-${i}`}>{row}</CalendarTr>
          ])}
        </tbody>
      </CalendarTable>
    </CalendarContainer>
  );
};

export default Calendar;
