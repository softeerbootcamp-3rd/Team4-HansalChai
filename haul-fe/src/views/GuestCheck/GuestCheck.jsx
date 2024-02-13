import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import Input from "../../components/Input/Input.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import { UrlMap } from "../../data/GlobalVariable.js";
import Header from "../../components/Header/Header.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";

const GuestCheck = () => {
  const navigate = useNavigate();

  const reservationNumber = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  function checkValidReservNum() {
    const reservNumRegEx = new RegExp("^([a-fA-F0-9])+$");
    const checkIsButtonDisabled = !(
      reservationNumber.current.trim().length ===
        reservationNumber.current.length &&
      reservNumRegEx.test(reservationNumber.current)
    );
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(
        checkIsButtonDisabled !== isButtonDisabled && checkIsButtonDisabled
      );
    }
  }

  //비회원 예약 확인 버튼 클릭 시 함수 (정보 입력 완료 버튼)
  function guestCheckBtnFun() {
    reservationNumber.current = reservationNumber.current.toLowerCase();
    navigate(
      `${UrlMap.checkReservationDetailPageUrl}/${reservationNumber.current}`
    );
  }

  return (
    <MobileLayout>
      <Header home={false} back={false}>
        <Typography font={"semiBold24"}>비회원 예약 확인</Typography>
      </Header>
      <Margin height="32px" />
      <Margin height="83px" />
      <Typography font="semiBold20">주문 번호</Typography>
      <Margin height="10px" />
      <form id="guestCheckReservForm">
        <Input
          size="small"
          type="text"
          placeholder="주문 번호를 입력하세요"
          onChange={({ target: { value } }) => {
            reservationNumber.current = value;
            checkValidReservNum();
          }}
        />
      </form>
      <FixedCenterBox bottom="30px">
        <BottomButton
          type="submit"
          role="main"
          disabled={isButtonDisabled}
          form="guestCheckReservForm"
          onClick={() => {
            guestCheckBtnFun();
          }}
        >
          예약 조회
        </BottomButton>
        <Margin height="80px" />
      </FixedCenterBox>
      <Margin height="100px" />
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default GuestCheck;
