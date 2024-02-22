import { isPhoneNumber } from "../../../utils/helper.js";
import { guestReservationFun } from "../../../repository/reservationRepository.js";
import { UrlMap, ErrorMessageMap } from "../../../data/GlobalVariable.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";

export function checkGuestInfoAbled({
  inGuestName,
  inGuestTel,
  isButtonDisabled,
  setButtonDisabled
}) {
  const checkIsButtonDisabled = !(
    inGuestName.current.trim() && inGuestTel.current.trim()
  );
  if (checkIsButtonDisabled !== isButtonDisabled) {
    setButtonDisabled(checkIsButtonDisabled);
  }
}

//비회원 로그인 버튼 클릭 시 함수 (정보 입력 완료 버튼)
export async function guestInfoBtnFun({
  inGuestName,
  inGuestTel,
  setGuestInfo,
  getReservationState,
  setResultLoading,
  navigate
}) {
  //전화번호 형식 예외처리
  if (!isPhoneNumber(inGuestTel.current)) {
    ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
    return;
  }

  setGuestInfo({
    guestName: inGuestName.current,
    guestTel: inGuestTel.current
  });

  const reservationState = getReservationState();
  setResultLoading(true);
  const { success, data, code } = await guestReservationFun({
    ...reservationState,
    guestName: inGuestName.current,
    guestTel: inGuestTel.current
  });

  if (success) {
    navigate(UrlMap.resultPageUrl, { state: { data: data.data } });
  } else {
    if (code === 1104)
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.NoMatchingHaulCarError
      });
    else ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
  setResultLoading(false);
}
