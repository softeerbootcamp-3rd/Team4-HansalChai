import { UrlMap, ErrorMessageMap } from "../../../data/GlobalVariable.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { isPhoneNumber } from "../../../utils/helper.js";

export function showUserTime(reservationTime) {
  const [reservationHour, reservationHourMin] = reservationTime
    .split(":")
    .map(v => Number(v));
  let showTime = "";
  reservationHour >= 12 ? (showTime = "오후 ") : (showTime = "오전 ");
  reservationHour === 12
    ? (showTime += `${reservationHour}시`)
    : (showTime += `${reservationHour % 12}시`);

  if (reservationHourMin !== 0) {
    showTime += `${reservationHourMin}분`;
  }
  return showTime;
}

//이 페이지에서 원하는 값이 다 있는지 체크
export function checkSubmitDisabledFun({
  mapInfo,
  inSrcDetailAddress,
  inSrcTel
}) {
  const isMapInfoFilled =
    mapInfo.coordinate.latitude !== "" &&
    mapInfo.coordinate.longitude !== "" &&
    mapInfo.detailAddress !== "";
  const isSrcDetailAddressFilled = inSrcDetailAddress.current.trim() !== "";
  const isSrcTelFilled = inSrcTel.current.trim() !== "";
  return !(isMapInfoFilled && isSrcDetailAddressFilled && isSrcTelFilled);
}

export function submitStore({
  inSrcTel,
  inSrcDetailAddress,
  mapInfo,
  setSrcInfo,
  navigation
}) {
  if (!isPhoneNumber(inSrcTel.current)) {
    ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
    return;
  }
  setSrcInfo({
    srcName: mapInfo.name,
    srcAddress: mapInfo.detailAddress,
    srcLatitude: Number(mapInfo.coordinate.latitude),
    srcLongitude: Number(mapInfo.coordinate.longitude),
    srcDetailAddress: inSrcDetailAddress.current,
    srcTel: inSrcTel.current
  });
  navigation(UrlMap.choiceDstPageUrl);
}
