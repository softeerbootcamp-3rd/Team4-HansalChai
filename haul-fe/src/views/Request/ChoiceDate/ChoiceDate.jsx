import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationStore } from "../../../store/reservationStore.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Calendar from "./components/Calendar.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import { isEmptyString, stringToDateObject } from "../../../utils/helper.js";
import { UrlMap } from "../../../data/GlobalVariable.js";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import { isLoginFun } from "../../../utils/localStorage.js";

const ChoiceDate = () => {
  const navigation = useNavigate();
  const [selectedDay, setSelectedDay] = useState();
  const {
    setReservationDate,
    state: { transportType, reservationDate }
  } = useContext(reservationStore);

  useEffect(() => {
    const isLogin = isLoginFun();
    if(!isLogin){
      navigation(UrlMap.loginPageUrl);
    }
    //예상치 않은 URL접속을 방지
    if (isEmptyString(transportType)) {
      navigation(UrlMap.choiceTranportTypeUrl);
    }
    //이전에 선택되어진게 있는지 확인. 있다면 그걸로 선택
    if (!isEmptyString(reservationDate)) {
      const beforeChoiceDate = stringToDateObject(reservationDate);
      setSelectedDay(beforeChoiceDate);
    }
  }, []);

  const DateFormChange = date => {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  };

  const SubmitBtnFun = () => {
    setReservationDate(DateFormChange(selectedDay));
    navigation(UrlMap.choiceTimePageUrl);
  };

  return (
    <MobileLayout>
      <Header>
        HAUL
        <TypographySpan color="subColor">.</TypographySpan>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <TypographySpan color="subColor">{transportType}</TypographySpan>을
        선택하셨군요.
      </Typography>
      <Margin height="4px" />
      <Typography font="bold24">언제 찾아뵈면 될까요?</Typography>
      <Margin height="60px" />
      <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <FixedCenterBox bottom="100px">
        <BottomButton
          role="main"
          disabled={!selectedDay}
          onClick={() => {
            SubmitBtnFun();
          }}
        >
          선택 완료
        </BottomButton>
      </FixedCenterBox>
      <NavigationBar />
    </MobileLayout>
  );
};
export default ChoiceDate;
