import React, { useState } from "react";
import styled from "styled-components";
import Margin from "../../../components/Margin/Margin";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Calendar = ({
  selectedDay,
  setSelectedDay,
  isPrevMonth,
  isNextMonth,
}) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
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

  //날짜를 클릭했을때 발생
  const onClickDay = (day) => {
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
    // 이번달 처음 일수를 구함.
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

    // 이전달의 값을 넣어둠.
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

  const buildCalendarTag = (calendarDays) => {
    return calendarDays.map((day, i) => {
      if (day.getMonth() < currentMonth.getMonth()) {
        return (
          <CalendarCell key={i} className="prevMonthDay">
            {isPrevMonth ? day.getDate() : ""}
          </CalendarCell>
        );
      }
      if (day.getMonth() > currentMonth.getMonth()) {
        return (
          <CalendarCell key={i} className="nextMonthDay">
            {isNextMonth ? day.getDate() : ""}
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
        >
          {day.getDate()}
        </CalendarCell>
      );
    });
  };

  const divideWeek = (calendarTags) => {
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
        <span>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </span>
        <div>
          <CalendarButton onClick={prevCalendar}>
            <IoIosArrowBack />
          </CalendarButton>
          <CalendarButton onClick={nextCalendar}>
            <IoIosArrowForward />
          </CalendarButton>
        </div>
      </CalendarNav>
      <Margin height="6px" />
      <CalendarTable>
        <thead>
          <tr>
            {daysOfWeek.map((day, i) => (
              <th key={i}>{day}</th>
            ))}
          </tr>
        </thead>
        <Margin height="8px" />
        <tbody>
          {calendarRows.map((row, i) => (
            <tr key={i}>{row}</tr>
          ))}
        </tbody>
      </CalendarTable>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: calc(100%-40px);
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CalendarNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  margin-bottom: 20px;
  ${(props) => props.theme.font.bold16};
`;

const CalendarButton = styled.button`
  background-color: #f8f8f8;
  border: none;
  color: ${(props) => props.theme.colors.black};
  font-size: 20px;
  cursor: pointer;
  padding-top: 1px;
`;

const CalendarTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  ${(props) => props.theme.font.semiBold14};
`;

const CalendarCell = styled.td`
  padding: 14px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  ${(props) => props.theme.font.semiBold12};

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

  &.choiceDay {
    background-color: #333;
    color: #fff;
  }
`;

export default Calendar;
