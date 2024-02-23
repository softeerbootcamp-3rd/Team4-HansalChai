import { getIsMember } from "../../../utils/localStorage";
import { guestReservationConfirmFun } from "../../../repository/reservationRepository";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import {
  CompanyCallNumber,
  UrlMap,
  ErrorMessageMap
} from "../../../data/GlobalVariable.js";

export function callCompany() {
  const phoneNumber = CompanyCallNumber;
  window.location.href = `tel:${phoneNumber}`;
}

export async function decideBtnFun({ data, navigation, setInitialState }) {
  const isMember = getIsMember();
  if (isMember === "false") {
    const { success, code } = await guestReservationConfirmFun({
      reservationId: data.reservationId,
      cost: data.cost
    });
    if (success) {
      setInitialState();
      navigation(UrlMap.completePageUrl);
    } else {
      if (code === 1103)
        ToastMaker({
          type: "error",
          children: ErrorMessageMap.NotFindReservationError
        });
      else if (code === 3001) {
        ToastMaker({
          type: "error",
          children: ErrorMessageMap.AlreadyReservationError
        });
        navigation(UrlMap.choiceTranportTypeUrl);
      } else
        ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
    }
    return;
  }
  navigation(UrlMap.choicePaymentPageUrl, {
    state: { reservationId: data.reservationId, cost: data.cost }
  });
}
