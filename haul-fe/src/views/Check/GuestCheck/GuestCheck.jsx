import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Input from "../../../components/Input/Input.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import Header from "../../../components/Header/Header.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import SummaryItemBox from "../List/components/SummaryItemBox.jsx";
import styled from "styled-components";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Truck from "../../../assets/svgs/BigTruck.svg";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { getGuestSummaryList } from "../../../repository/checkRepository.js";

const TruckImg = styled.img`
  position: absolute;
  width: 126px;
  height: 90px;
  border: none;
  right: 5%;
  bottom: 10%;
  fill: ${props => props.theme.colors[props.fill]};
  object-fit: scale-down;
  object-position: center;
`;

const AdvisorFrame = styled.div`
  width: 100%;
  min-height: 202px;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: left;
  background-color: ${({ theme }) => theme.colors.mainColor};
  opacity: 0.4;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 15px;
  cursor: default;
  position: relative;
`;

const UpperTyphography = styled(Typography)`
  z-index: 1;
`;

const GuestCheck = () => {
  const reservationNumber = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [reservationData, setReservationData] = useState(undefined);

  //예약번호 유효성 검사 - 12자리 숫자만 사용
  const checkReservIDValidation = () => {
    const reservNumRegEx = new RegExp("^([0-9]{12})$");
    return (
      reservationNumber.current.trim().length ===
        reservationNumber.current.length &&
      reservNumRegEx.test(reservationNumber.current)
    );
  };

  //버튼 활성화 유효성 검사
  function buttonValidation() {
    const checkIsButtonDisabled = !checkReservIDValidation();
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(
        checkIsButtonDisabled !== isButtonDisabled && checkIsButtonDisabled
      );
    }
  }

  //비동기 함수로 예약번호를 통해 예약 정보 조회
  //TODO: 데이터를 받아올 때까지 스켈레톤 띄우기(근데 꼭 띄워야 할만큼 느릴까?)
  const updateReservationNumber = async setter => {
    const newReserv = await getGuestSummaryList({
      reservationSerial: reservationNumber.current
    });
    const newData = newReserv.success
      ? newReserv.data.reservationInfoDTOS[0]
      : undefined;
    //undefined일 경우엔 다르게 렌더링 되므로 업데이트 필요
    setter(() => newData);
    if (newReserv.success === false) {
      ToastMaker({ type: "error", children: "예약 정보를 찾을 수 없어요." });
    }
  };

  //비회원 예약 확인 버튼 클릭 시 함수 (정보 입력 완료 버튼) -> 예약번호를 통해 예약 정보 조회 후 있으면 요약 블록 띄우기
  function guestCheckButtonHandler(e) {
    e.preventDefault();
    if (!checkReservIDValidation()) {
      //여기 도달할 일이 있을까?
      ToastMaker({ type: "error", children: "주문 번호를 잘못 입력했어요." });
    }
    updateReservationNumber(setReservationData);
  }

  return (
    <MobileLayout>
      <Header home={false} back={false}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          비회원 예약 확인
        </Typography>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        <TypographySpan color="subColor">하울</TypographySpan>에서 했던
        <br />
        비회원 예약을 조회할 수 있어요.
      </Typography>
      <Margin height="20px" />
      <form id="guestCheckReservForm">
        <Input
          size="small"
          type="text"
          placeholder="예약 번호를 입력하세요"
          onChange={({ target: { value } }) => {
            reservationNumber.current = value;
            buttonValidation();
          }}
        />
      </form>
      <Margin height="32px" />
      {reservationData === undefined ? (
        <AdvisorFrame>
          <UpperTyphography font={"bold20"} color={"white"}>
            예약 번호를 확인해주세요!
          </UpperTyphography>
          <Margin height="12px" />
          <UpperTyphography font={"medium16"} color={"white"}>
            예약 번호는 12자리의 <br />
            숫자로 이루어져 있어요.
          </UpperTyphography>
          <TruckImg src={Truck} height={50} width={80} fill="white" />
        </AdvisorFrame>
      ) : (
        <Link to={`/check/detail/${reservationData.id}`}>
          <SummaryItemBox
            model={reservationData.car}
            status={reservationData.status}
            time={reservationData.datetime}
            fee={reservationData.cost}
          />
        </Link>
      )}
      <Margin height="100px" />
      <NavigationBar selected="check" />
      <FixedCenterBox bottom="30px">
        <BottomButton
          type="submit"
          role="main"
          disabled={isButtonDisabled}
          form="guestCheckReservForm"
          onClick={e => {
            guestCheckButtonHandler(e);
          }}
        >
          예약 조회
        </BottomButton>
        <Margin height="80px" />
      </FixedCenterBox>
    </MobileLayout>
  );
};

export default GuestCheck;
