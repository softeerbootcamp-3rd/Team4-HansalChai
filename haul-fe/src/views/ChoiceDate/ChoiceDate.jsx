import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../components/Header/Header.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationStore } from "../../store/reservationStore.jsx";
import { isEmptyString } from "../../utils/helper.js";
import Calendar from "./components/Calendar.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import { UrlMap } from "../../data/GlobalVariable.js";

const ChoiceDate = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const navigation = useNavigate();
  const { setReservationDate } = useContext(reservationStore);
  const {
    state: { transportType },
  } = useContext(reservationStore);

  useEffect(() => {
    if (isEmptyString(transportType)) {
      navigation(-1);
    }
  }, []);

  const DateFormChange = (date) => {
    return (
      date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate()
    );
  };

  return (
    <MobileLayout>
      <Margin height="10px" />
      <Header>
        HAUL<span style={{ color: "#596FB7" }}>.</span>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <span style={{ color: "#596FB7" }}>{transportType}</span>을
        선택하셨군요.
      </Typography>
      <Margin height="4px" />
      <Typography font="bold24">언제 찾아뵈면 될까요?</Typography>
      <Margin height="60px" />
      <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <FixedCenterBox bottom="20px">
        <BottomButton
          role="main"
          disabled={!selectedDay}
          onClick={() => {
            setReservationDate(DateFormChange(selectedDay));
            navigation(UrlMap.choiceTimePageUrl);
          }}
        >
          선택 완료
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};
export default ChoiceDate;
