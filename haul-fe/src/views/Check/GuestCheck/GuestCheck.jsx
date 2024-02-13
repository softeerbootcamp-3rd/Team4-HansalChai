import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Input from "../../../components/Input/Input.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import { UrlMap } from "../../../data/GlobalVariable.js";
import Header from "../../../components/Header/Header.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import { dummySummary } from "../../../data/DummyData.js";
import SummaryItemBox from "../List/components/SummaryItemBox.jsx";
import LoadingTruck from "../../../assets/gifs/LoadingTruck.json";
import Lottie from "lottie-react";
import Flex from "../../../components/Flex/Flex.jsx";

const GuestCheck = () => {
  const navigate = useNavigate();

  const reservationNumber = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [reservationData, setReservationData] = useState(undefined);

  //ReservationNumber 유효성 검사 - 예약번호는 UUID로 '-'만 없앰. 소문자로 통일해서 전송 -> ^([a-fA-F0-9]){35}([a-fA-F0-9])$
  //TODO: 더미를 위해 임시로 1글자로 제한한 정규식을 바꿀 것
  function checkValidReservNum() {
    const reservNumRegEx = new RegExp("^([a-fA-F0-9])$");
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
    setReservationData(dummySummary(reservationNumber.current));
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
   
      <Margin height="20px" />
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
      <Margin height="32px" />
      {reservationData === undefined ? (
        <Flex kind="flexCenter">
          <Lottie animationData={LoadingTruck} style={{ maxWidth: "500px" }} />
        </Flex>
      ) : (
        <Link to={`/check/detail/${reservationNumber.current}`}>
          <SummaryItemBox
            model={reservationData.model}
            status={reservationData.status}
            time={reservationData.time}
            fee={reservationData.fee}
          />
        </Link>
      )}
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
