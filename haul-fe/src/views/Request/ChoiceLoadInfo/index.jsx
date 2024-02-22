import { isNumber, isPositiveNumber } from "../../../utils/helper.js";
import { getIsMember } from "../../../utils/localStorage.js";
import { memberReservationFun } from "../../../repository/reservationRepository.js";
import { isTokenInvalid } from "../../../repository/userRepository.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import {
  UrlMap,
  ErrorMessageMap,
  TransportTypeArr
} from "../../../data/GlobalVariable.js";

export function CheckSubmitDisabledFun({
  inCargoWeight,
  inCargoWidth,
  inCargoLength,
  inCargoHeight,
  submitDisabled,
  CheckSubmitDisabled
}) {
  const exInCargoWeight = inCargoWeight.trim();
  const exInCargoWidth = inCargoWidth.trim();
  const exInCargoLength = inCargoLength.trim();
  const exInCargoHeight = inCargoHeight.trim();

  const checkSubmitDisabled = !(
    exInCargoWeight &&
    exInCargoWidth &&
    exInCargoLength &&
    exInCargoHeight
  );
  if (submitDisabled !== checkSubmitDisabled) {
    CheckSubmitDisabled(checkSubmitDisabled);
  }
}

export async function SumbitStore({
  inCargoWeight,
  inCargoWidth,
  inCargoLength,
  inCargoHeight,
  setRoadInfo,
  navigate,
  setResultLoading,
  transportType,
  inSpecialNotes,
  getReservationState
}) {
  const cargoWeightNum = Number(inCargoWeight.current);
  const cargoWidthNum = Number(inCargoWidth.current);
  const cargoLengthNum = Number(inCargoLength.current);
  const cargoHeightNum = Number(inCargoHeight.current);

  if (
    !isNumber(inCargoWeight.current) ||
    !isNumber(inCargoWidth.current) ||
    !isNumber(inCargoLength.current) ||
    !isNumber(inCargoHeight.current)
  ) {
    ToastMaker({ type: "error", children: ErrorMessageMap.IsNotNumber });
    return;
  }
  if (
    !isPositiveNumber(inCargoWeight.current) ||
    !isPositiveNumber(inCargoWidth.current) ||
    !isPositiveNumber(inCargoLength.current) ||
    !isPositiveNumber(inCargoHeight.current)
  ) {
    ToastMaker({
      type: "error",
      children: ErrorMessageMap.IsNotPositiveNumber
    });
    return;
  }

  function checkWeightToTypeFun(checkTransportType, weight) {
    for (const transportInfo of TransportTypeArr) {
      if (transportInfo.transportType === checkTransportType) {
        if (weight > transportInfo.maxLoad * 1000) {
          return transportInfo.maxLoad;
        } else {
          return 0;
        }
      }
    }
    return 0;
  }

  const checkWeightToType = checkWeightToTypeFun(transportType, cargoWeightNum);
  //transportType에 대한 분류
  if (checkWeightToType > 0) {
    ToastMaker({
      type: "info",
      children: `현재 선택하신 운송종류는 ${checkWeightToType}톤까지 실으실 수 있습니다.`
    });
    return;
  }

  //최대 너비, 높이, 길이에 대한 분류
  if (cargoWidthNum > 1000 || cargoLengthNum > 1000 || cargoHeightNum > 1000) {
    ToastMaker({
      type: "info",
      children: `Haul은 1000cm미만의 크기를 지원합니다.`
    });
    return;
  }

  setRoadInfo({
    cargoWeight: cargoWeightNum,
    cargoWidth: cargoWidthNum,
    cargoLength: cargoLengthNum,
    cargoHeight: cargoHeightNum,
    specialNotes: inSpecialNotes
  });

  const isMember = getIsMember();
  //비회원이라면 guestInfo 페이지로 이동
  if (isMember === "false") {
    navigate(UrlMap.guestInfoPageUrl);
    return;
  }
  const reservationState = getReservationState();
  // 회원이라면 바로 결과 페이지로 이동
  setResultLoading(true);
  const { success, data, code } = await memberReservationFun({
    ...reservationState,
    cargoWeight: cargoWeightNum,
    cargoWidth: cargoWidthNum,
    cargoLength: cargoLengthNum,
    cargoHeight: cargoHeightNum,
    specialNotes: inSpecialNotes
  });
  if (success) {
    navigate(UrlMap.resultPageUrl, { state: { data: data.data } });
  } else {
    if (isTokenInvalid(code)) navigate(UrlMap.loginUrl);
    if (code === 1104)
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.NoMatchingHaulCarError
      });
    else ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
  }
  setResultLoading(false);
}
